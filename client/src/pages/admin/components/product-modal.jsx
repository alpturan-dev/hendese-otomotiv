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

export default function ProductModal({ products, setProducts }) {
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [newProduct, setNewProduct] = useState({
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
    const [imageFiles, setImageFiles] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

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
            console.error("Error uploading images:", error);
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
                console.log(error);
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

    return (
        <Loading loading={loading}>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full md:w-auto" variant="outline"
                        onClick={() => setOpen(true)}>
                        Parça ekle
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] px-10 py-5">
                    <DialogHeader className="py-4">
                        <DialogTitle>Parça ekle</DialogTitle>
                        <DialogDescription>Parçanın bilgilerini aşağıya gir</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={addProduct}>
                        <div className="grid gap-8">
                            <div className="flex items-center gap-4 ">
                                <Label className="w-[200px]" htmlFor="images">
                                    Resimler
                                </Label>
                                <Input accept="image/*" className="max-w-[700px] w-full" id="images" multiple type="file" onChange={handleImages} />
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
                            <div className="grid gap-6 md:grid-cols-2">
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
                                    <Select className="max-w-[200px] w-full" id="categories" multiple placeholder="Model seç..."
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
                                    <Select className="max-w-[200px] w-full" id="categories" multiple placeholder="Parça seç..."
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
                                        {categories.map((category, index) => (
                                            <div key={index} className="flex gap-3">
                                                <Checkbox id={category} name="categories"
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
                                        ))}
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
                            <Button type="submit">Ekle</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </Loading>
    )
}

