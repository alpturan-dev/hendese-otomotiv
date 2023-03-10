import React from 'react'
import { useState } from 'react'
import Navbar from '../layout/Navbar'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Box, Container, Typography } from '@mui/material'
import SellIcon from '@mui/icons-material/Sell';
import InventoryIcon from '@mui/icons-material/Inventory';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useLocation } from 'react-router-dom';
import Footer from '../layout/Footer'
import FloatingWhatsApp from '../layout/FloatingWhatsApp'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

function ProductPage() {
    const location = useLocation();
    const product = location.state;
    const [active, setActive] = useState(0);
    function handleActive(index) {
        console.log("length", product.images.length)
        setActive(index);
    }
    function handlePrevious() {
        setActive((prevState) => {
            console.log(prevState)
            if (prevState - 1 < 0) {
                return (product.images.length - 1)
            } else {
                return (prevState - 1)
            }
        });
    }
    function handleNext() {
        setActive((prevState) => {
            console.log(prevState)
            if (prevState + 1 === product.images.length) {
                return 0
            } else {
                return (prevState + 1)
            }
        });
    }
    return (
        <>
            <Navbar />
            <Box sx={{ bgcolor: "secondary.main" }}>
                <Container sx={{ paddingY: "50px", height: "100%" }}>
                    <Box sx={{ paddingBottom: "100px", display: "flex", flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" }, justifyContent: { xs: "center", sm: "center", md: "space-between", lg: "space-between" }, gap: { xs: "40px", sm: "40px", md: "100px", lg: "100px" } }}>
                        <Box
                            sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "15px" }}
                        >
                            <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                <KeyboardArrowLeftIcon
                                    sx={{ width: "40px", cursor: "pointer", height: "100%", margin: "auto 0" }}
                                    onClick={handlePrevious}

                                />
                                <Zoom>
                                    <Box sx={{
                                        width: { xs: "360px", sm: "425px", md: "425px", lg: "455px" },
                                        height: { xs: "360px", sm: "425px", md: "425px", lg: "455px" },
                                        border: "2px solid #ddd",
                                        '&:hover': { border: "3px solid gray" }, transition: "0.1s ease-in-out",
                                        borderRadius: "5px"
                                    }}>
                                        <ZoomInIcon sx={{ width: "30px", height: "30px", position: "absolute", top: "10px", right: "10px" }} />
                                        <img
                                            src={product.images[active]}
                                            style={{ width: "100%", height: "100%" }}
                                            alt={product.images[active]}
                                        />
                                    </Box>
                                </Zoom>
                                <KeyboardArrowRightIcon
                                    onClick={handleNext}
                                    sx={{ width: "40px", cursor: "pointer", height: "100%", margin: "auto 0" }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                {product.images.map((image, index) => {
                                    return (
                                        <Box
                                            key={index}
                                            onClick={() => handleActive(index)}
                                            sx={{
                                                width: { xs: "80px", sm: "80px", md: "100px", lg: "100px" },
                                                height: { xs: "80px", sm: "80px", md: "100px", lg: "100px" },
                                                border: index === active ? "5px solid #ddd" : "2px solid #ddd",
                                                transition: "0.1s ease-in-out",
                                                borderRadius: "5px"
                                            }}>
                                            <img style={{ width: "100%", height: "100%" }} src={image} alt={image} />
                                        </Box>
                                    )
                                }
                                )}
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", width: { xs: "100%", sm: "80%", md: "80%", lg: "80%" }, height: "415px", gap: "20px" }}>
                            <Typography variant="h4">Suzuki {product.model} {product.name}
                                <Typography sx={{ fontWeight: "100", opacity: "0.7" }} variant="body1">{product.category} | {product.oem}</Typography>
                            </Typography>
                            <Typography sx={{ fontWeight: "400", lineHeight: '1.5' }} paragraph>
                                {product.description}
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" }, justifyContent: "space-between", alignItems: "center", gap: { xs: "30px", sm: "30px", md: "10px", lg: "10px" } }}>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "20px", sm: "20px", md: "40px", lg: "40px" } }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", borderRadius: "3px" }}>
                                        <Typography sx={{ display: "flex", alignItems: "center", fontWeight: "bold", gap: "10px" }} variant="h4">
                                            <SellIcon sx={{ color: "primary.main" }} />
                                            {product.price}
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ display: "flex", alignItems: "center", fontWeight: "light", gap: "10px" }}>
                                        <InventoryIcon sx={{ color: "primary.main" }} />
                                        Stok adedi: {product.stock}
                                    </Typography>
                                    <Box sx={{ display: "flex", gap: "20px" }}>
                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: { xs: "0.9rem", sm: "0.9rem", md: "1.3rem" },
                                                color: "secondary.main",
                                                backgroundColor: "primary.main",
                                                gap: "10px",
                                                transition: "0.5s",
                                                padding: "15px 25px",
                                                borderRadius: "5px",
                                                boxShadow: "#ed3137 3px 3px 1px",
                                                '&:hover': {
                                                    opacity: "0.9"
                                                }
                                            }}
                                        >
                                            <a href="tel:05303604105" style={{ display: "flex", alignItems: "center", flexDirection: "row", gap: "10px", color: "#f7f7f7", textDecoration: "none" }}>
                                                <Typography sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <ShoppingBasketIcon />
                                                    {/* Hemen Ara! */}
                                                </Typography>
                                                +90 530 360 41 05
                                            </a>
                                        </Box>
                                        <Box
                                            sx={{
                                                cursor: "pointer",
                                                width: "40%",
                                                height: "90px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: { xs: "0.9rem", sm: "0.9rem", md: "1.3rem" },
                                                color: "secondary.main",
                                                backgroundColor: "#118C7E",
                                                gap: "10px",
                                                transition: "0.5s",
                                                padding: "20px 25px",
                                                borderRadius: "5px 5px 0 0",
                                                boxShadow: "#118C7E 3px 3px 1px ",
                                                '&:hover': {
                                                    opacity: "0.9"
                                                }
                                            }}
                                        >
                                            <a href="https://wa.me/05303604105" style={{ color: "#f7f7f7", textDecoration: "none" }}>
                                                <Typography sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <WhatsAppIcon /> WhatsApp
                                                </Typography>
                                            </a>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <FloatingWhatsApp />
            <Footer />
        </>
    )
}

export default ProductPage