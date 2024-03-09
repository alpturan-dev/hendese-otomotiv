import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import axios from 'axios'
import AddModal from './components/AddModal'
import { useToast } from "@/components/ui/use-toast"
import { storage } from '@/config/firebaseConfig'
import { ref, deleteObject } from 'firebase/storage';
import { DeleteDialog } from '@/components/DeleteDialog'
import Loading from "@/components/Loading"

const Admin = () => {
    const { toast } = useToast()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        setLoading(true);
        axios.get(import.meta.env.VITE_API_URL + '/api/products')
            .then((response) => {
                setProducts(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false));
    }

    const deleteProduct = async (product) => {
        setLoading(true);
        try {
            product.images.map(async (image) => {
                const deleteRef = ref(storage, image);
                await deleteObject(deleteRef);
            })
            await axios.delete(import.meta.env.VITE_API_URL + '/api/products/' + product._id)
                .then(() => {
                    setProducts(products.filter((item) => item._id !== product._id));
                    toast({
                        title: "Parça başarıyla silindi!",
                        className: "bg-green-500 text-white",
                        duration: 3000
                    })
                })
                .catch((error) => {
                    console.log(error);
                    toast({
                        title: "Parça silinemedi!",
                        description: error.response.data.message,
                        variant: "destructive",
                        duration: 3000
                    })
                });
        } catch (error) {

        }
        setLoading(false);
    }


    useEffect(() => {
        getProducts();
    }, [])

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login')
    }

    const username = JSON.parse(localStorage.getItem('user'))?.username;
    const password = JSON.parse(localStorage.getItem('user'))?.password;

    useEffect(() => {
        if (username === undefined && password === undefined) {
            return navigate('/login');
        }
    })

    return (
        <Loading loading={loading}>
            <div className="flex flex-col min-h-screen">
                <header className="flex items-center h-14 px-4 border-b lg:h-16 bg-gray-100/40 dark:bg-gray-800/40 border-gray-200 dark:border-gray-800">
                    <h1 className="text-lg font-semibold">Hendese Otomotiv Admin Paneli</h1>
                    <span className='ml-auto text-sm'>{username}</span>
                    <Button variant="destructive" onClick={handleLogout} className="ml-8">Çıkış yap</Button>
                </header>
                <div className='w-full flex flex-row items-center justify-between'>
                    {/* <form className="ml-4 mt-4 flex items-center gap-4 lg:gap-8">
                    <Input
                        className="w-full max-w-xs appearance-none font-normal md:max-w-sm lg:max-w-md"
                        placeholder="Ara..."
                        type="search"
                    />
                    <Button type="submit">Ara</Button>
                </form> */}
                    <div></div>
                    <div className='mr-4 mt-4'>
                        <AddModal products={products} setProducts={setProducts} />
                    </div>
                </div>
                <main className="flex-1 overflow-y-auto p-4">
                    <div className="grid gap-4 md:gap-8">
                        <div className="overflow-auto rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-100">
                                        <TableHead className="w-[100px]">Resim</TableHead>
                                        <TableHead>İsim</TableHead>
                                        <TableHead className="hidden md:table-cell">Açıklama</TableHead>
                                        <TableHead>Stok</TableHead>
                                        <TableHead>OEM</TableHead>
                                        <TableHead>Ücret</TableHead>
                                        <TableHead className="hidden md:table-cell">Model</TableHead>
                                        <TableHead className="hidden md:table-cell">Parça</TableHead>
                                        <TableHead className="hidden lg:table-cell">Kategoriler</TableHead>
                                        <TableHead className="w-[100px] text-center"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.map((product, index) => (
                                        <TableRow key={product._id || index}>
                                            <TableCell>
                                                <img
                                                    alt={product.name}
                                                    className="aspect-square rounded-md object-cover"
                                                    height="96"
                                                    src={product.images[0]}
                                                    width="96"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">{product.name}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {product.description}
                                            </TableCell>
                                            <TableCell>{product.stock}</TableCell>
                                            <TableCell className="hidden md:table-cell">{product.oem}</TableCell>
                                            <TableCell>{product.price}</TableCell>
                                            <TableCell className="hidden md:table-cell">{product.model}</TableCell>
                                            <TableCell className="hidden md:table-cell">{product.part}</TableCell>
                                            <TableCell className="hidden lg:table-cell">
                                                {product.categories.map((category, index) =>
                                                    <div key={index}>{category}{product.categories.length > index + 1 && ','}</div>
                                                )}
                                            </TableCell>
                                            <TableCell className="">
                                                <Button size="icon" variant="ghost">
                                                    <FileEditIcon className="w-4 h-4" />
                                                    <span className="sr-only">Düzenle</span>
                                                </Button>
                                                <DeleteDialog product={product} deleteProduct={() => deleteProduct(product)} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </main>
            </div>
        </Loading>
    )
}

export default Admin

function FileEditIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
        </svg>
    )
}
