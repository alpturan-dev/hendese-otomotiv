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
import { useEffect, useState } from "react"
import { v4 } from "uuid";
import { useToast } from "@/components/ui/use-toast"
import imageCompression from "browser-image-compression"
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
        models: product?.models || [],
        part: product?.part || parts[0],
        isActive: product?.isActive || true,
        categories: product?.categories || [],
    })
    const [imageFiles, setImageFiles] = useState([]);
    const [imageUrls, setImageUrls] = useState(product?.images || []);
    const [deleteImgUrls, setDeleteImgUrls] = useState([])

    const handleImages = async (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            console.log('originalFile instanceof Blob', newImage instanceof Blob); // true
            console.log(`originalFile size ${newImage.size / 1024 / 1024} MB`);
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            }
            try {
                const compressedFile = await imageCompression(newImage, options);
                console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                setImageFiles((prevState) => [...prevState, compressedFile]);
            } catch (error) {
                console.log(error);
            }
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
                    models: [],
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
                    models: [],
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
                        <Button size="icon" className="w-8 h-8 md:w-auto md:h-auto" variant="ghost"
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
                <DialogContent className="w-[95vw] max-w-[700px] h-[90vh] md:h-auto px-2 md:px-6 py-2 overflow-y-auto">
                    <DialogHeader className="py-4">
                        <DialogTitle>Parça {type === "edit" ? "düzenle" : "ekle"}</DialogTitle>
                        <DialogDescription>Parçanın bilgilerini aşağıya gir</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => type === "new" ? addProduct(e) : editProduct(e)} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-wrap justify-center gap-2">
                                {imageUrls?.map((img) => (
                                    <div key={img} className='relative border border-gray-400 hover:border-red-900 w-20 h-20' onClick={() => {
                                        setDeleteImgUrls(prev =>
                                            prev.includes(img) ? prev.filter(url => url !== img) : [...prev, img]
                                        );
                                    }}>
                                        {deleteImgUrls.includes(img) && (
                                            <div className="absolute inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center">
                                                <DeleteIcon />
                                            </div>
                                        )}
                                        <img src={img} className="w-full h-full object-cover" alt="Product" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="images">Resimler</Label>
                                <Input accept="image/*" id="images" multiple type="file" onChange={handleImages} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name">Parça İsmi</Label>
                                <Input id="name" placeholder="Parça ismi gir..." value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="description">Açıklama</Label>
                                <Textarea className="resize-none" id="description" placeholder="Parça açıklaması gir..." value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="part">Parça</Label>
                                    <Select id="part" value={newProduct.part} onValueChange={(e) => setNewProduct({ ...newProduct, part: e })}>
                                        <SelectTrigger>
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
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="oem">OEM</Label>
                                    <Input id="oem" placeholder="OEM gir..." value={newProduct.oem} onChange={(e) => setNewProduct({ ...newProduct, oem: e.target.value })} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="quantity">Stok Miktarı</Label>
                                    <Input id="quantity" type="number" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="price">Ücret</Label>
                                    <div className="flex items-center gap-2">
                                        <Input disabled={newProduct.price === "FİYAT SORUNUZ"} id="price" placeholder="Ücret gir..." value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                                        <Checkbox
                                            checked={newProduct.price === "FİYAT SORUNUZ"}
                                            onCheckedChange={(checked) => {
                                                setNewProduct({
                                                    ...newProduct,
                                                    price: checked ? "FİYAT SORUNUZ" : ""
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Modeller</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {models.map((model, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`model-${index}`}
                                                    checked={newProduct.models.includes(model)}
                                                    onCheckedChange={(checked) => {
                                                        setNewProduct({
                                                            ...newProduct,
                                                            models: checked
                                                                ? [...newProduct.models, model]
                                                                : newProduct.models.filter(m => m !== model)
                                                        });
                                                    }}
                                                />
                                                <Label htmlFor={`model-${index}`}>{model}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Kategoriler</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {categories.map((category, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`category-${index}`}
                                                    checked={newProduct.categories.includes(category)}
                                                    onCheckedChange={(checked) => {
                                                        setNewProduct({
                                                            ...newProduct,
                                                            categories: checked
                                                                ? [...newProduct.categories, category]
                                                                : newProduct.categories.filter(c => c !== category)
                                                        });
                                                    }}
                                                />
                                                <Label htmlFor={`category-${index}`}>{category}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="isActive">Satışta mı?</Label>
                                    <Checkbox
                                        id="isActive"
                                        checked={newProduct.isActive}
                                        onCheckedChange={(checked) => setNewProduct({ ...newProduct, isActive: checked })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="pt-4">
                            <Button type="submit" className="w-full">{type === "new" ? "Ekle" : "Düzenle"}</Button>
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

