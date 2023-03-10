import React from 'react'
import { useState, useEffect } from 'react'
import { Modal, Box, Typography, Button, TextField, Checkbox } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import { v4 } from "uuid";
import { toast } from 'react-hot-toast';
import { storage } from '../firebase'
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import CategorySelect from './CategorySelect'
import ModelSelect from './ModelSelect'
import { useContext } from 'react';
import ModalContext from '../context/ModalContext';
function AddProductModal({ addProduct }) {
    const {
        open,
        handleClose,
        newProductImages,
        setNewProductImages,
        setNewProductName,
        setNewProductDescription,
        setNewProductStock,
        setNewProductOEM,
        setNewProductPrice,
    } = useContext(ModalContext);

    useEffect(() => {
        setIsUploaded(false)
    }, [])

    const [priceField, setPriceField] = useState(false);

    const [isUploaded, setIsUploaded] = useState(false);
    const [imageFiles, setImageFiles] = useState([]);
    const handleImage = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImageFiles((prevState) => [...prevState, newImage]);
        }
    }
    const uploadImage = async () => {
        toast.loading('Resim yükleniyor...');
        imageFiles.map((image) => {
            const imageRef = ref(storage, `images/${image.name + v4()}`);
            return uploadBytes(imageRef, image)
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then((url) => {
                            setNewProductImages((prevState) => [...prevState, url]);
                            toast.dismiss();
                        });
                });
        })
        setIsUploaded(true);
        setImageFiles([])
        toast.success("Resimler yüklendi!");
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "1100px",
                    bgcolor: 'background.paper',
                    border: '1px solid #ddd',
                    borderRadius: "5px",
                    boxShadow: "150px gray",
                    padding: "35px 55px",
                    display: "flex",
                    gap: "25px",
                    flexDirection: "column",
                    justifyContent: "center",
                }}>
                <Button
                    sx={{
                        position: "absolute", right: "2%", top: "3%", display: "flex", flexDirection: "row-reverse", justifyContent: "center", height: "40px", marginRight: "0",
                        backgroundColor: "#ED3137", color: "white", padding: "6px 0px",
                        '&:hover': {
                            cursor: "pointer",
                            backgroundColor: "#ED3137",
                            color: "white",
                            opacity: "0.9"
                        }
                    }}
                    onClick={handleClose} alt="Kapat"
                >
                    <CloseIcon sx={{ width: "20px", height: "20px" }} />
                </Button>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <Typography id="modal-modal-title" variant="h4"
                        sx={{ fontWeight: "bolder", color: "#1D7091", borderBottom: "3px solid #1D7091" }}>
                        Yeni Ürün
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItem: "center", justifyContent: "space-evenly" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "30px", justifyContent: "space-between" }}>
                        <Box
                            sx={{
                                display: "flex", flexDirection: "column", gap: "15px", width: "400px"
                            }}>
                            <Typography id="modal-modal-title" variant="h6"
                                sx={{ fontWeight: "bolder", textDecoration: "underline" }}>
                                Ürün Resmi
                            </Typography>
                            <label style={{
                                display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", cursor: "pointer", background: "#F0F0F0",
                                boxShadow: "5px 5px 5px gray",
                                padding: "2rem 4rem"
                            }}>
                                {isUploaded ?
                                    <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                                        {newProductImages.map((image, index) => (
                                            <img key={index} src={image} alt={image} style={{ width: "100px", height: "100px" }} />
                                        ))}
                                    </Box>
                                    :
                                    <UploadFileIcon style={{ width: "100px", height: "100px" }} />
                                }

                                <input
                                    type="file"
                                    multiple
                                    style={{ display: "none" }}
                                    onChange={handleImage}
                                />
                                <Typography>{newProductImages.length !== 0 ? "Resimler seçildi!" : "Bir dosya seçin"}</Typography>
                                <Button sx={{
                                    backgroundColor: "#1D7091", color: "white", padding: "8px 6px", fontSize: "0.7rem",
                                    '&:hover': {
                                        backgroundColor: "#1D7091",
                                        color: "white",
                                        opacity: "0.9"
                                    }
                                }} onClick={uploadImage} size="small">
                                    RESİMLERİ YÜKLE
                                </Button>
                            </label>

                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Typography id="modal-modal-title" variant="h6"
                                sx={{ fontWeight: "bolder", textDecoration: "underline" }}>
                                Ürün Adı
                            </Typography>
                            <TextField color="secondary" required autoComplete="off" fullWidth id="standard-basic" variant="filled"
                                onChange={(event) => setNewProductName(event.target.value)}
                            />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Typography id="modal-modal-title" variant="h6"
                                sx={{ fontWeight: "bolder", textDecoration: "underline" }}>
                                Ürün Açıklaması
                            </Typography>
                            <TextField
                                color="secondary"
                                required
                                autoComplete="off"
                                id="standard-multiline-static"
                                multiline
                                rows={7}
                                variant="filled"
                                onChange={(event) => setNewProductDescription(event.target.value)}
                                fullWidth
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "30px", marginBottom: "2rem" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Typography id="modal-modal-title" variant="h6"
                                sx={{ fontWeight: "bolder", textDecoration: "underline" }}>
                                Stok Adedi
                            </Typography>
                            <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} color="secondary" required autoComplete="off" fullWidth id="standard-basic" variant="filled"
                                onChange={(event) => setNewProductStock(event.target.value)}
                            />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Typography id="modal-modal-title" variant="h6"
                                sx={{ fontWeight: "bolder", textDecoration: "underline" }}>
                                Ürün OEM Kodu
                            </Typography>
                            <TextField color="secondary" required autoComplete="off" fullWidth id="standard-basic" variant="filled"
                                onChange={(event) => setNewProductOEM(event.target.value)}
                            />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Typography id="modal-modal-title" variant="h6"
                                sx={{ fontWeight: "bolder", textDecoration: "underline" }}>
                                Fiyatı (₺)
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                <TextField disabled={priceField && true}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    sx={{ backgroundColor: priceField && "#ddd" }}
                                    color="secondary"
                                    required
                                    autoComplete="off"
                                    fullWidth
                                    id="standard-basic"
                                    variant="filled"
                                    onChange={(event) => setNewProductPrice(event.target.value)}
                                />
                                <input
                                    type="checkbox"
                                    name="price"
                                    id="price"
                                    style={{
                                        textAlign: "center",
                                        cursor: "pointer",
                                        backgroundColor: "gray", color: "white", padding: "15px 12px", fontSize: "0.7rem",
                                    }}
                                    onClick={() => {
                                        setPriceField((prev) => !prev);
                                        setNewProductPrice("Fiyat Sorunuz")
                                    }}>
                                </input>
                                <label htmlFor="price" style={{ cursor: "pointer", }}>Fiyat Sorunuz</label>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Typography id="modal-modal-title" variant="h6"
                                sx={{ fontWeight: "bolder", textDecoration: "underline" }}>
                                Ürün Kategorisi
                            </Typography>
                            <CategorySelect />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Typography id="modal-modal-title" variant="h6"
                                sx={{ fontWeight: "bolder", textDecoration: "underline" }}>
                                Ürün Modeli
                            </Typography>
                            <ModelSelect />
                        </Box>
                    </Box>
                </Box>
                <Box onClick={addProduct} sx={{
                    textAlign: "center", width: "20%", margin: "auto",
                    backgroundColor: "#1D7091", color: "white", padding: "15px 12px", fontSize: "1.1rem",
                    boxShadow: "2px 2px 2px #1D7091",
                    '&:hover': {
                        cursor: "pointer",
                        backgroundColor: "#1D7091",
                        color: "white",
                        opacity: "0.9"
                    }
                }}>
                    <Typography variant="h6">Ürün Ekle</Typography>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddProductModal