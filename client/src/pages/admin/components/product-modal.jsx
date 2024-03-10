import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { parts, models, categories } from "@/constants/constants"
import axios from 'axios'
import { storage } from '@/config/firebaseConfig'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { useState } from "react"
import { v4 } from "uuid";
import { useToast } from "@/components/ui/use-toast"
import Loading from "@/components/loading"

export default function ProductModal({ element, product, products, setProducts, type = "new", getProducts }) {
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [newProduct, setNewProduct] = useState({
        _id: product?._id,
        name: product?.name || "",
        description: product?.description || "",
        stock: product?.stock || '0',
        oem: product?.oem || "",
        price: product?.price || "",
        model: product?.model || models[0],
        part: product?.part || parts[0],
        isActive: product?.isActive || true,
        categories: product?.categories || [],
    })
    const [imageFiles, setImageFiles] = useState([]);
    const [imageUrls, setImageUrls] = useState(product?.images || []);
    const [deleteImgUrls, setDeleteImgUrls] = useState([])

    const handleImages = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImageFiles((prevState) => [...prevState, newImage]);
        }
    }

    const uploadImages = async () => {
        try {
            const uploadedUrls = await Promise.all(
                imageFiles.map(async (image) => {
                    const imageRef = ref(storage, `images/${image.name + v4()}`);
                    const snapshot = await uploadBytes(imageRef, image);
                    const url = await getDownloadURL(snapshot.ref);
                    return url;
                })
            );
            const updatedImageUrls = [...imageUrls, ...uploadedUrls];
            setImageUrls(updatedImageUrls);
            setImageFiles([]);
            return updatedImageUrls;
        } catch (error) {
            toast({
                title: "Resimler yüklenirken hata!",
                description: error.response.data.message,
                variant: "destructive",
                duration: 3000
            })
            return [];
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        let imgUrls = []
        imgUrls = await uploadImages();
        const tempProduct = { ...newProduct, images: imgUrls }
        axios.post(import.meta.env.VITE_API_URL + '/api/products',
            tempProduct)
            .then((response) => {
                setProducts([...products, response.data])
                setNewProduct({
                    name: "",
                    description: "",
                    stock: 0,
                    oem: "",
                    price: "",
                    model: models[0],
                    part: parts[0],
                    isActive: true,
                    categories: [],
                })
                toast({
                    title: "Yeni parça eklendi!",
                    className: "bg-green-500 text-white",
                    duration: 3000
                })
            })
            .catch((error) => {
                imgUrls.map(async (image) => {
                    const deleteRef = ref(storage, image);
                    await deleteObject(deleteRef);
                })
                toast({
                    title: "Parça eklenemedi!",
                    description: error.response.data.message,
                    variant: "destructive",
                    duration: 3000
                })
            })
            .finally(() => {
                setLoading(false);
                setOpen(false);
            });
    }

    const editProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            deleteImgUrls.map(async (image) => {
                const deleteRef = ref(storage, image);
                await deleteObject(deleteRef);
            })
        } catch (error) {
            toast({
                title: "Resimler silinemedi!",
                description: error.response.data.message,
                variant: "destructive",
                duration: 3000
            })
            setLoading(false);
            setOpen(false);
            return;
        }
        let imgUrls = []
        imgUrls = await uploadImages();
        imgUrls = imgUrls.filter(item => !deleteImgUrls.includes(item))
        const tempProduct = { ...newProduct, images: imgUrls };
        axios.put(import.meta.env.VITE_API_URL + '/api/products/' + tempProduct._id,
            tempProduct)
            .then(async () => {
                await getProducts();
                setNewProduct({
                    name: "",
                    description: "",
                    stock: 0,
                    oem: "",
                    price: "",
                    model: models[0],
                    part: parts[0],
                    isActive: true,
                    categories: [],
                })
                toast({
                    title: "Parça düzenlendi!",
                    className: "bg-green-500 text-white",
                    duration: 3000
                })
            })
            .catch((error) => {
                imgUrls.map(async (image) => {
                    const deleteRef = ref(storage, image);
                    await deleteObject(deleteRef);
                })
                toast({
                    title: "Parça düzenlenemedi!",
                    description: error.response.data.message,
                    variant: "destructive",
                    duration: 3000
                })
            })
            .finally(() => {
                setLoading(false);
                setOpen(false);
            });
    }

    return (
        <Loading loading={loading}>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {type === "edit" ? (
                        <Button size="icon" className="w-4 h-4 md:w-auto" variant="ghost"
                            onClick={() => setOpen(true)}
                        >
                            {element}
                        </Button>
                    ) : (
                        <Button className="w-full md:w-auto" variant="outline"
                            onClick={() => setOpen(true)}>
                            {element}
                        </Button>
                    )}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] px-10 py-2">
                    <DialogHeader className="py-4">
                        <DialogTitle>Parça {type === "edit" ? "düzenle" : "ekle"}</DialogTitle>
                        <DialogDescription>Parçanın bilgilerini aşağıya gir</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => type === "new" ? addProduct(e) : editProduct(e)}>
                        <div className="grid gap-4">
                            <div className="flex flex-col gap-6 ">
                                <div className="flex gap-6 justify-center">
                                    {imageUrls?.map((img) => {
                                        const inDeleteUrlArray = deleteImgUrls.find((deleteImg) => deleteImg === img);
                                        let tempDeleteArray = [...deleteImgUrls];
                                        return (
                                            <div key={img} className='border border-gray-400 hover:border-red-900' onClick={() => {
                                                if (inDeleteUrlArray) {
                                                    tempDeleteArray = tempDeleteArray.filter((el) => el !== img);
                                                } else {
                                                    tempDeleteArray.push(img)
                                                }
                                                setDeleteImgUrls(tempDeleteArray)
                                            }} >
                                                {inDeleteUrlArray && (
                                                    <div className="absolute">
                                                        <DeleteIcon />
                                                    </div>
                                                )}
                                                <img src={img} className="w-20 h-20" />
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="flex items-center gap-4 ">
                                    <Label className="w-[200px]" htmlFor="images">
                                        Resimler
                                    </Label>
                                    <Input accept="image/*" className="max-w-[700px] w-full" id="images" multiple type="file" onChange={handleImages} />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Label className="w-[200px]" htmlFor="name">
                                    Parça İsmi
                                </Label>
                                <Input id="name" placeholder="Parça ismi gir..." value={newProduct.name} onChange={(e) => setNewProduct({
                                    ...newProduct,
                                    name: e.target.value
                                })} />
                            </div>
                            <div className="flex items-center gap-4">
                                <Label className="w-[200px]" htmlFor="description">
                                    Açıklama
                                </Label>
                                <Textarea className="max-w-[700px] w-full resize-none" id="description" placeholder="Parça açıklaması gir..." value={newProduct.description} onChange={(e) => setNewProduct({
                                    ...newProduct,
                                    description: e.target.value
                                })} />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="flex items-center gap-4">
                                    <Label className="w-[200px]" htmlFor="quantity">
                                        Stok Miktarı
                                    </Label>
                                    <Input id="quantity" type="number" value={newProduct.stock} onChange={(e) => setNewProduct({
                                        ...newProduct,
                                        stock: e.target.value
                                    })} />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label className="w-[200px]" htmlFor="model">
                                        Model
                                    </Label>
                                    <Select className="max-w-[200px] w-full" id="model" multiple placeholder="Model seç..."
                                        value={newProduct.model}
                                        onValueChange={(e) => setNewProduct({
                                            ...newProduct,
                                            model: e
                                        })}>
                                        <SelectTrigger className="w-[310px]">
                                            <SelectValue placeholder="Model seç..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {models.map((model, index) => (
                                                    <SelectItem key={index} value={model}>{model}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label className="w-[200px]" htmlFor="price">
                                        Ücret
                                    </Label>
                                    <Input id="price" placeholder="Ücret gir..." value={newProduct.price} onChange={(e) => setNewProduct({
                                        ...newProduct,
                                        price: e.target.value
                                    })} />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label className="w-[200px]" htmlFor="part">
                                        Parça
                                    </Label>
                                    <Select className="max-w-[200px] w-full" id="part" multiple placeholder="Parça seç..."
                                        value={newProduct.part}
                                        onValueChange={(e) => setNewProduct({
                                            ...newProduct,
                                            part: e
                                        })}>
                                        <SelectTrigger className="w-[310px]">
                                            <SelectValue placeholder="Parça seç..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {parts.map((part, index) => (
                                                    <SelectItem key={index} value={part}>{part}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label className="w-[200px]" htmlFor="oem">
                                        OEM
                                    </Label>
                                    <Input id="oem" placeholder="OEM gir..." value={newProduct.oem} onChange={(e) => setNewProduct({
                                        ...newProduct,
                                        oem: e.target.value
                                    })} />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label className="w-[110px]" htmlFor="categories">
                                        Kategoriler
                                    </Label>
                                    <div className="flex flex-col gap-2">
                                        {categories.map((category, index) => {
                                            const isChecked = newProduct.categories.find((cat) => cat === category);
                                            return (
                                                <div key={index} className="flex gap-3">
                                                    <Checkbox id={category} name="categories"
                                                        checked={isChecked ? true : false}
                                                        onCheckedChange={() => {
                                                            if (newProduct.categories.find((cat) => cat === category)) {
                                                                let newProductCategories = newProduct.categories.filter((cat) => cat !== category)
                                                                setNewProduct({
                                                                    ...newProduct,
                                                                    categories: newProductCategories
                                                                })
                                                            } else {
                                                                setNewProduct({
                                                                    ...newProduct,
                                                                    categories: [...newProduct.categories, category]
                                                                })
                                                            }
                                                        }} />
                                                    <Label htmlFor={category}>{category}</Label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Label className="w-[130px]" htmlFor="isActive">
                                        Satışta mı?
                                    </Label>
                                    <Checkbox id="isActive" name="isActive"
                                        checked={newProduct.isActive}
                                        onCheckedChange={() => setNewProduct({
                                            ...newProduct,
                                            isActive: !newProduct.isActive
                                        })} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-6 flex justify-end">
                            <Button type="submit">{type === "new" ? <>Ekle</> : <>Düzenle</>}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </Loading>
    )
}

function DeleteIcon() {
    return (
        <svg className="w-20 h-20 text-red-800" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
    )
}

