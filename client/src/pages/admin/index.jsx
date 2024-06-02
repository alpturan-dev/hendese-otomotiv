import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import axios from "axios";
import ProductModal from "./components/product-modal";
import { useToast } from "@/components/ui/use-toast";
import { storage } from "@/config/firebaseConfig";
import { ref, deleteObject } from "firebase/storage";
import { DeleteDialog } from "@/components/delete-dialog";
import Loading from "@/components/loading";

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const deleteProduct = async (product) => {
    setLoading(true);
    try {
      product.images.map(async (image) => {
        const deleteRef = ref(storage, image);
        await deleteObject(deleteRef);
      });
      await axios
        .delete(import.meta.env.VITE_API_URL + "/api/products/" + product._id)
        .then(() => {
          setProducts(products.filter((item) => item._id !== product._id));
          toast({
            title: "Parça başarıyla silindi!",
            className: "bg-green-500 text-white",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: "Parça silinemedi!",
            description: error.response.data.message,
            variant: "destructive",
            duration: 3000,
          });
        });
    } catch (error) { }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const username = JSON.parse(localStorage.getItem("user"))?.username;
  const password = JSON.parse(localStorage.getItem("user"))?.password;

  useEffect(() => {
    if (username === undefined && password === undefined) {
      return navigate("/login");
    }
  });

  return (
    <Loading loading={loading}>
      <div className="flex min-h-screen flex-col">
        <header className="flex h-14 items-center border-b border-gray-200 bg-gray-100/40 px-4 dark:border-gray-800 dark:bg-gray-800/40 lg:h-16">
          <h1 className="text-lg font-semibold">
            Hendese Otomotiv Admin Paneli
          </h1>
          <span className="ml-auto text-sm">{username}</span>
          <Button variant="destructive" onClick={handleLogout} className="ml-8">
            Çıkış yap
          </Button>
        </header>
        <div className="flex w-full flex-row items-center justify-between">
          {/* <form className="ml-4 mt-4 flex items-center gap-4 lg:gap-8">
                    <Input
                        className="w-full max-w-xs appearance-none font-normal md:max-w-sm lg:max-w-md"
                        placeholder="Ara..."
                        type="search"
                    />
                    <Button type="submit">Ara</Button>
                </form> */}
          <div></div>
          <div className="mr-4 mt-4">
            <ProductModal
              element={<>Parça ekle</>}
              products={products}
              setProducts={setProducts}
            />
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
                    <TableHead className="hidden md:table-cell">
                      Açıklama
                    </TableHead>
                    <TableHead>Stok</TableHead>
                    <TableHead>OEM</TableHead>
                    <TableHead>Ücret</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Model
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Parça
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Kategoriler
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Satışta
                    </TableHead>
                    <TableHead className="w-[100px] text-center"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product?._id}>
                      <TableCell>
                        <img
                          loading="lazy"
                          alt={product.name}
                          className="aspect-square rounded-md object-cover"
                          height="96"
                          src={product.images[0]}
                          width="96"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.description}
                      </TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.oem}
                      </TableCell>
                      <TableCell>{product.price}</TableCell>
                      {/* <TableCell className="hidden md:table-cell">
                        {product.models[0]}
                      </TableCell> */}
                      <TableCell className="hidden md:table-cell">
                        {product.part}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {product.categories.map((category, index) => (
                          <div key={index}>
                            {category}
                            {product.categories.length > index + 1 && ","}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.isActive ? "Evet" : "Hayır"}
                      </TableCell>
                      <TableCell className="">
                        <ProductModal
                          element={
                            <>
                              <FileEditIcon className="h-4 w-4" />
                              <span className="sr-only">Düzenle</span>
                            </>
                          }
                          type="edit"
                          getProducts={getProducts}
                          product={product}
                          products={products}
                          setProducts={setProducts}
                        />
                        <DeleteDialog
                          product={product}
                          deleteProduct={() => deleteProduct(product)}
                        />
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
  );
};

export default Admin;

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
  );
}
