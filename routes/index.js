import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.get("/",(req, res)=>{
    const error = req.flash("error") 
    res.render("index", { error })
})

// router.get("/shop", verifyJWT, (req, res)=>{
//     res.render("shop")
// })
// router.get("/shop", verifyJWT, async (req, res) => {
//   try {
//     const products = await products.find(); // sab products la raha hai
//     res.render("shop", { products, user: req.user }); // EJS me bhejna zaruri hai
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Something went wrong");
//   }
// });
router.get("/shop", verifyJWT, async (req, res) => {
  try {
    // 🔹 agar DB use kar raha hai to use Product.find()
    // const products = await Product.find();

    // 🔹 abhi test ke liye static data bhej de:
    const products = [
      { name: "T-shirt", price: 999, bgcolor: "#f5f5f5", image: Buffer.from("") },
      { name: "Shoes", price: 2499, bgcolor: "#e0e0e0", image: Buffer.from("") },
      { name: "Cap", price: 499, bgcolor: "#d1d1d1", image: Buffer.from("") }
    ];

    res.render("shop", { products });
  } catch (error) {
    console.error("Shop route error:", error);
    req.flash("error", "Something went wrong");
    res.redirect("/");
  }
});
export default router
 