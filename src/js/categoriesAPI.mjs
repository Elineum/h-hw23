import commonImageUrl from "./defaultImageAPI.mjs";

const categoriesMockAPI = [
  {
    categoryType: "electronics",
    categoryName: "Electronics",
    products: [
      {
        productName: "telephone",
        productDisc: "best nokia 5130 ever",
        productId: "telephone",
        imgUrl: commonImageUrl,
        price: 130000,
      },
      {
        productName: "computer",
        productDisc: "Fastest PC on windows 95",
        productId: "computer",
        imgUrl: commonImageUrl,
        price: 6500,
      },
      {
        productName: "notebook",
        productDisc: "Good and flat wooden notebook",
        productId: "notebook",
        imgUrl: commonImageUrl,
        price: 6000,
      },
      {
        productName: "charge device",
        productDisc: "Just charge device",
        productId: "charge",
        imgUrl: commonImageUrl,
        price: 40,
      },
    ],
  },
  {
    categoryType: "food",
    categoryName: "Food",
    products: [
      {
        productName: "fried nails",
        productDisc: "Delicious French fried nails with teriyaki sauce",
        productId: "friedNails",
        imgUrl: commonImageUrl,
        price: 335,
      },
      {
        productName: "fresh nails",
        productDisc: "Fresh unfried nails with salt",
        productId: "freshNails",
        imgUrl: commonImageUrl,
        price: 125,
      },
      {
        productName: "salmon",
        productDisc: "Still live fish without caviar",
        productId: "salmon",
        imgUrl: commonImageUrl,
        price: 170,
      },
      {
        productName: "eggs",
        productDisc: "Ostrich eggs mixed with quail eggs. Guess where what!",
        productId: "eggs",
        imgUrl: commonImageUrl,
        price: 6,
      },
    ],
  },
  {
    categoryType: "medicine",
    categoryName: "Medicine",
    products: [
      {
        productName: "Drugs",
        productDisc: "Drugs is bad!",
        productId: "drugs",
        imgUrl: commonImageUrl,
        price: 99,
      },
      {
        productName: "syrup",
        productDisc: "Syrop is good!",
        productId: "syrup",
        imgUrl: commonImageUrl,
        price: 5,
      },
      {
        productName: "ascorbic",
        productDisc: "Ascorbic for 9999 dollars, pure platinum ascorbic",
        productId: "ascorbic",
        imgUrl: commonImageUrl,
        price: 9999,
      },
      {
        productName: "med.patch",
        productDisc: "Med patch if u been injured ",
        productId: "patch",
        imgUrl: commonImageUrl,
        price: 1,
      },
    ],
  },
  {
    categoryType: "tools",
    categoryName: "Building Tools",
    products: [
      {
        productName: "common nails",
        productDisc: "Nails. Ok? Just nails!",
        productId: "nails",
        imgUrl: commonImageUrl,
        price: 2,
      },
      {
        productName: "roulette",
        productDisc: "Krutilka.",
        productId: "roulette",
        imgUrl: commonImageUrl,
        price: 15,
      },
      {
        productName: "hammer",
        productDisc: "The best gift for your neighbors",
        productId: "hammer",
        imgUrl: commonImageUrl,
        price: 25,
      },
      {
        productName: "drill",
        productDisc: "The best gift for your neighbors, same as hammer",
        productId: "drill",
        imgUrl: commonImageUrl,
        price: 5432,
      },
    ],
  },
  {
    categoryType: "sports",
    categoryName: "Sports",
    products: [
      {
        name: "tennis ball",
        productName: "tennis ball",
        productDisc: "Square tennis ball",
        productId: "ball",
        imgUrl: commonImageUrl,
        price: 3,
      },
      {
        productName: "racket",
        productDisc: "Jelly racket",
        productId: "racket",
        imgUrl: commonImageUrl,
        price: 670,
      },
      {
        productName: "punching bag",
        productDisc: "Висит груша нельзя скушать.",
        productId: "bag",
        imgUrl: commonImageUrl,
        price: 3999,
      },
      {
        productName: "sport boots",
        productDisc: "So soft boots",
        productId: "boots",
        imgUrl: commonImageUrl,
        price: 1500,
      },
    ],
  },
  {
    categoryType: "pets",
    categoryName: "Goods for animals",
    products: [
      {
        productName: "Food for cat",
        productDisc: "Best cat food for your best pet (recommend)",
        productId: "catFood",
        imgUrl: commonImageUrl,
        price: 10,
      },
      {
        productName: "sport boots",
        productDisc: "Best dog food for your best pet",
        productId: "dogFoot",
        imgUrl: commonImageUrl,
        price: 15,
      },
      {
        productName: "food for some people",
        productDisc: "You know who to give it to!",
        productId: "humFood",
        imgUrl: commonImageUrl,
        price: 5,
      },
      {
        productName: "leash",
        productDisc: "For animals, but for people possible too",
        productId: "leash",
        imgUrl: commonImageUrl,
        price: 10,
      },
    ],
  },
];

export default categoriesMockAPI;
