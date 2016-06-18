var productsTemp = [
  {
    name: "Sony KDL32R300C 32-Inch 720p LED TV (2015 Model)",
    by: "Sony",
    image: [
      "https://images-na.ssl-images-amazon.com/images/I/81RstnIX0iL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61AAvIgZCIL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/619B7wrCsPL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61y0kowGcVL._SL1500_.jpg"
    ],
    description: [
      "Refresh Rate: 60Hz (Native); Motionflow XR120 (Effective)",
      "Backlight: LED (Direct-Lit)",
      "Smart Functionality: No",
      "Crisp detail & contrast with Clear Resolution Enhancer",
      "Superior picture delivered via Direct-lit LED panel",
      "Inputs: 2 HDMI, 1 USB"
    ],
    price: 149.99,
    stock: 100,
    tags: ["tv", "tvs", "television"]
  },
  {
    name: "Samsung UN40H5003 40-Inch (39.5-Inch Measured Diagonally)1080p LED TV (2014 Model)",
    by: "Samsung",
    image: [
      "https://images-na.ssl-images-amazon.com/images/I/91BZ7U%2Bn1%2BL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/91H8qYNHGnL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/81xJr-udolL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/91cOEON22wL._SL1500_.jpg"
    ],
    description: [
      "Refresh Rate: 60Hz (Native); 120 CMR (Effective)",
      "Backlight: LED (Edge-Lit)",
      "Smart Functionality: No",
      "Dimensions (W x H x D): TV without stand: 36.1\" x 21\" x 3.7\", TV with stand: 36.1\" x 23.3\" x 9\"",
      "Inputs: 2 HDMI, 1 USB, 1 Component In, 1 Composite In",
      "Accessories Included: Standard Remote Control"
    ],
    price: 277.99,
    stock: 30,
    tags: ["tv", "tvs", "television"]
  },
  {
    name: "TCL 48FS3750 48-Inch 1080p Roku Smart LED TV (2016 Model)",
    by: "TCL",
    image: [
      "http://ecx.images-amazon.com/images/I/81bRl88tE3L._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71CpyufYAOL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/91AimoxReRL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71FlJW17VJL._SL1500_.jpg"
    ],
    description: [
      "Refresh Rate: 60Hz (Native), 120Hz Clear Motion Index (Effective)",
      "Backlight: LED (Full Array)",
      "Smart Functionality: Yes - Roku TV Streaming Platform",
      "Dimensions (W x H x D): TV without stand: 42.9\" x 24.5\" x 3.2\", TV with stand: 42.9\" x 27\" x 9.1\"",
      "Inputs: 3 HDMI, 1 USB, RF, Composite, Headphone Jack, Optical Audio Out",
      "Accessories Included: Remote w/ batteries, detachable power cord"
    ],
    price: 431.21,
    stock: 100,
    tags: ["tv", "tvs", "television"]
  },
  {
    name: "Samsung UN32J4000 32-Inch 720p LED TV (2015 Model)",
    by: "Samsung",
    image: [
      "http://ecx.images-amazon.com/images/I/91AZu70gX7L._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61HzwvtW-CL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71bMxAnPHoL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/91pqf1ggxzL._SL1500_.jpg"
    ],
    description: [
      "Refresh Rate: 60CMR (Effective)",
      "Backlight: LED",
      "Smart Functionality: No",
      "Dimensions (W x H x D): TV w/ stand: 29.3\" x 18.2\" x 5.9\", TV w/o stand: 29.3\" x 17.1\" x 2.7\"",
      "Inputs: 2 HDMI, 1 USB. Please refer the User Manual before use."
    ],
    price: 188.11,
    stock: 100,
    tags: ["tv", "tvs", "television"]
  },
  {
    name: "Eloquent JavaScript: A Modern Introduction to Programming",
    by: "Marijn Haverbeke",
    image: [
      "http://ecx.images-amazon.com/images/I/51zFTdNilAL._SX377_BO1,204,203,200_.jpg",
      "http://ecx.images-amazon.com/images/I/713IAT6ORAL.jpg"
    ],
    price: 21.57,
    stock: 100,
    description: [
      "The essential elements of programming, including syntax, control, and data",
      "How to organize and clarify your code with object-oriented and functional programming techniques",
      "How to script the browser and make basic web applications",
      "How to use the DOM effectively to interact with browsers",
      "How to harness Node.js to build servers and utilities"
    ],
    tags: ["book", "books", "javascript"]
  },
  {
    name: "JavaScript: The Definitive Guide: Activate Your Web Pages (Definitive Guides)",
    by: "David Flanagan",
    image: [
      "http://ecx.images-amazon.com/images/I/51WD-F3GobL.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51e72HP1qpL.jpg"
    ],
    price: 33.89,
    stock: 100,
    description: [
      "Since 1996, JavaScript: The Definitive Guide has been the bible for JavaScript programmers—a programmer's guide and comprehensive reference to the core language and to the client-side JavaScript APIs defined by web browsers. The 6th edition covers HTML5 and ECMAScript 5. Many chapters have been completely rewritten to bring them in line with today's best web development practices. New chapters in this edition document jQuery and server side JavaScript. It's recommended for experienced programmers who want to learn the programming language of the Web, and for current JavaScript programmers who want to master it."
    ],
    tags: ["book", "books", "javascript"]
  },
  {
    name: "JavaScript and JQuery: Interactive Front-End Web Development",
    by: "Jon Duckett",
    image: [
      "http://ecx.images-amazon.com/images/I/41fqWJ%2Br4gL._SX400_BO1,204,203,200_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/41dSKZjFDaL.jpg"
    ],
    price: 27.27,
    stock: 100,
    description: [
      "In JavaScript & jQuery renowned author Jon Duckett discards the traditional programming book template and approaches writing code in a more relevant, less intimidating way. Full-color and packed with instructional graphics and photos, his books have gained a loyal following by illustrating programming in a way both instructive for newcomers and invaluable for seasoned coders."
    ],
    tags: ["book", "books", "javascript"]
  },
  {
    name: "Apple iPhone 5S Silver 16GB Unlocked GSM Smartphone",
    by: "Apple",
    image: [
      "http://ecx.images-amazon.com/images/I/61S-VVOqxoL._SL1250_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71oC9HFkgaL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71rLSzu0S4L._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61CAxPC7eDL._SL1500_.jpg"
    ],
    description: [
      "iOS 7 (upgradable), Dual-Core 1.3 GHz Cyclone (ARM v8-based) Processor, Chipset: Apple A7, PowerVR G6430 (quad-core graphics) Graphics",
      "2G: GSM 850 / 900 / 1800 / 1900, 3G: HSDPA 850 / 900 / 1700 / 1900 / 2100, 4G: LTE (bands are carrier dependent)",
      "8 Megapixel Camera (3264 x 2448 pixels) w/ Autofocus, dual-LED (dual tone) Flash + Front-Facing 1.2 Megapixel Camera, 720p@30fps, face detection, FaceTime over Wi-Fi or Cellular, Video",
      "Factory unlocked iPhones are GSM models and are ONLY compatible with GSM carriers like AT&T and T-Mobile as well as other GSM networks around the world. They WILL NOT WORK with CDMA carriers like Sprint, Verizon and the likes. The phone requires a nano SIM card (not included in the package)."
    ],
    price: 213.99,
    stock: 100,
    tags: ["iphone", "iphones", "phone", "apple"]
  },
  {
    name: "Apple iPhone 5 A1428 Factory Unlocked Cellphone, 16GB, Black",
    by: "Apple",
    image: [
      "https://images-na.ssl-images-amazon.com/images/I/61lYvsBbTQL._SL1048_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/517dOqay38L._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/81OrlDyDZiL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71RCyrexO4L._SL1500_.jpg"
    ],
    description: [
      "GSM Factory Unlocked: Device is unlocked for use on any GSM network, please contact your service provider prior to purchasing to ensure full compatibility. GSM providers include AT&T & T-Mobile",
      "Features: Wi-Fi, Bluetooth, Built-in rechargeable lithium-ion battery. Talk time: Up to 8 hours on 3G. Display: 4-inch (diagonal) widescreen Multi-Touch display",
      "A6 chip, iCloud, 8.0MP iSight camera, All-new EarPods and improved audio,  iOS version may very",
      "In the package: iPhone 5 16GB, USB Cable, Wall Charger, EarPods with Remote and Mic, Documentation"
    ],
    price: 270.99,
    stock: 100,
    tags: ["iphone", "iphones", "phone", "apple"]
  },
  {
    name: "Apple iPhone SE Unlocked Phone 16 GB Retail Packaging - Space Gray",
    by: "Apple",
    image: [
      "http://ecx.images-amazon.com/images/I/61l3G55J0sL._SL1392_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/413Zp8F-A1L.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71v0ArC3jBL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71RMO1EqGQL._SL1500_.jpg"
    ],
    description: [
      "Retina display; 4inch (diagonal) LEDbacklit widescreen MultiTouch display",
      "12megapixel iSight camera with 1.22µ pixels; f/2.2 aperture; Hybrid IR filter; Panorama (up to 63 megapixels)",
      "4K video recording (3840 by 2160) at 30 fps; Slomo video support for 1080p at 120 fps and 720p at 240 fps; Take 8-megapixel still photos while recording 4K video",
      "FaceTime HD Camera: 1.2megapixel photos; f/2.4 aperture; Improved local tone mapping; Retina Flash; Talk time: Up to 14 hours on 3G",
      "Fingerprint sensor built into the Home button; A9 chip with 64bit architecture; Embedded M9 motion coprocessor"
    ],
    price: 499.99,
    stock: 100,
    tags: ["iphone", "iphones", "phone", "apple"]
  },
  {
    name: "Apple iPhone 4 (MD439LL/A) - 8GB Smartphone - Black - Verizon (Certified Refurbished)",
    by: "Apple",
    image: [
      "http://ecx.images-amazon.com/images/I/818yAEMJC6L._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61HlLvGZ1XL._SL1080_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61%2BKTqqgUPL._SL1091_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/41IqDsVW-GL.jpg"
    ],
    description: [
      "This Certified Refurbished product is factory refurbished, shows limited or no wear, and includes all relevant accessories plus a 90-day warranty",
      "8GB internal storage - 1 GHz Cortex-A8 CPU - 512 MB RAM",
      "iOS 4 - upgradable",
      "5MP camera - 2592 x 1936 pixels, autofocus, LED flash",
      "Corning Gorilla Glass, oleophobic coating"
    ],
    price: 59.99,
    stock: 100,
    tags: ["iphone", "iphones", "phone", "apple"]
  },
  {
    name: "Apple iPhone 5 Unlocked Cellphone, 16GB, Black",
    by: "Apple",
    image: [
      "https://images-na.ssl-images-amazon.com/images/I/715rr6uRY0L._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/613bFC-bCvL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/517dOqay38L._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/7157mP29WeL._SL1500_.jpg"
    ],
    description: [
      "GSM Factory Unlocked: Device is unlocked for use on any GSM network, please contact your service provider prior to purchasing to ensure full compatibility. GSM providers include AT&T & T-Mobile",
      "Features: Wi-Fi, Bluetooth, Built-in rechargeable lithium-ion battery. Talk time: Up to 8 hours on 3G. Display: 4-inch (diagonal) widescreen Multi-Touch display",
      "A6 chip, iCloud, 8.0MP iSight camera, All-new EarPods and improved audio,  iOS version may very",
      "In the package: iPhone 5 16GB, USB Cable, Wall Charger, EarPods with Remote and Mic, Documentation"
    ],
    price: 250.99,
    stock: 100,
    tags: ["iphone", "iphones", "phone", "apple"]
  },
  {
    name: "Apple iPhone 5 16GB - Unlocked - White (Certified Refurbished)",
    by: "Apple",
    image: [
      "http://ecx.images-amazon.com/images/I/71mGm56-EjL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61wkpqN2ROL._SL1200_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71ZyQ7wH35L._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71Mfyc8TKFL._SL1500_.jpg"
    ],
    description: [
      "Camera: Primary - 8 MP iSight camera, 1080p HD Video / Secondary - 1.2MP FaceTime Camera",
      "Unlocked cell phones are compatible with GSM carriers like AT&T and T-Mobile as well as with GSM SIM cards (e.g. H20, Straight Talk, and select prepaid carriers). Unlocked cell phones will not work with CDMA Carriers like Sprint, Verizon, Boost or Virgin.",
      "iOS 6, Apple A6 Processor, 16GB Memory",
      "4.0 inch Retina LED-backlit IPS LCD capacitive touchscreen display",
      "This Certified Refurbished product is factory refurbished, shows limited or no wear, and includes all relevant accessories plus a 90-day warranty"
    ],
    price: 179.99,
    stock: 100,
    tags: ["iphone", "iphones", "phone", "apple"]
  },
  {
    name: "Apple iPhone 6 a1549 16GB Space Gray Unlocked",
    by: "Apple",
    image: [
      "http://ecx.images-amazon.com/images/I/61eihG04VZL._SL1000_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/81D4af0lJ-L._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/81kgy7D4WrL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51ew5ObmQWL._SL1500_.jpg"
    ],
    description: [
      "4.7-inch touchscreen display with a resolution of 750 pixels by 1334 pixels at a PPI of 326 pixels per inch",
      "Powered by Apple A8 processor",
      "8-megapixel primary camera on the rear and a 1.2-megapixel front shooter for selfies",
      "16GB of internal storage cannot be expanded",
      "Includes A/C Adapter & Lightning Cable"
    ],
    price: 559.95,
    stock: 100,
    tags: ["iphone", "iphones", "phone", "apple"]
  },
  {
    name: "Apple iPhone 4 Verizon 16GB Cellphone White",
    by: "Apple",
    image: [
      "http://ecx.images-amazon.com/images/I/41ua5HiV45L.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/41wmT4zruOL.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71NuVKfyOsL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/41ptMD99XTL.jpg"
    ],
    description: [
      "8GB internal storage - 1 GHz Cortex-A8 CPU - 512 MB RAM",
      "iOS 4 - upgradable",
      "5MP camera - 2592 x 1936 pixels, autofocus, LED flash",
      "Corning Gorilla Glass, oleophobic coating"
    ],
    price: 92.99,
    stock: 100,
    tags: ["iphone", "iphones", "phone", "apple"]
  }
]
