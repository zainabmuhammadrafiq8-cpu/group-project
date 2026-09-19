const services = {

    Hair: [
        {
            name: "Hair Styling",
            price: "Rs. 2,500",
            image: "https://www.mbmmakeupstudio.com/wp-content/uploads/2021/10/hair-styling-course-in-Delhi.jpg",
            description: "Professional styling for a beautiful everyday or special look."
        },
        {
            name: "Hair Treatment",
            price: "Rs. 3,500",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdnoU4b6yeOeCzdXgSNfa3Jh2jydV45OQMQJBRaWp4_k91gDIbqG7KJSqm&s=10",
            description: "Deep nourishing treatment for healthier looking hair."
        },
        {
            name: "Hair Color",
            price: "Rs. 5,000",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTplejsCv4ZYBKstEYS7KBb-rb0q3CrO7EcW-FWsuflBuM1n4OK3x0goAI&s=10",
            description: "Beautiful professional hair coloring customized for you."
        }
    ],

    Makeup: [
        {
            name: "Party Makeup",
            price: "Rs. 4,000",
            image: "https://i.pinimg.com/564x/62/cc/30/62cc302283d482f202cb7296a74e25a6.jpg",
            description: "Elegant makeup for parties and special occasions."
        },
        {
            name: "Soft Glam",
            price: "Rs. 5,000",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-JjbPiqvhUCAl9t9810rjXVB1f2ZrrSKKoeto5mssQeP6t_ALaQXdb2mY&s=10",
            description: "Soft, elegant and glowing makeup look."
        },
        {
            name: "Bridal Makeup",
            price: "Rs. 15,000",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpmie8nWbTvilfFp2aG31vPPzAmejTk2mnCZuAvknFtSOUjlTaY0uxp3c&s=10",
            description: "Complete bridal makeup designed for your special day."
        }
    ],

    Skin: [
        {
            name: "Glow Facial",
            price: "Rs. 3,000",
            image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80",
            description: "Refreshing facial for healthy and glowing skin."
        },
        {
            name: "Deep Cleansing",
            price: "Rs. 2,500",
            image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=700&q=80",
            description: "Deep cleansing treatment for refreshed skin."
        },
        {
            name: "Skin Polish",
            price: "Rs. 3,500",
            image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=700&q=80",
            description: "Professional skin polishing for a radiant finish."
        }
    ],

    Nails: [
        {
            name: "Manicure",
            price: "Rs. 1,500",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4R5O_dZi2dZTRVVMPP_cAFv2Bn9ZSQS7zpCZHyn4hKni4wPc1dOvjnZc&s=10",
            description: "Complete nail care and manicure experience."
        },
        {
            name: "Gel Nails",
            price: "Rs. 2,500",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsntVg71qR1glhYB9XLIER8_HFMtPjdn2uHwuTQpCeht95fRghDx6vjepN&s=10",
            description: "Long-lasting and elegant gel nail styling."
        },
        {
            name: "Pedicure",
            price: "Rs. 2,000",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrP45x4_LWMvsWiU-G6yojcaTjT-LcPfvGFrXdvj_-ZkopxruKSQsMGqWT&s=10",
            description: "Relaxing pedicure with complete foot care."
        }
    ],

    Spa: [
        {
            name: "Relaxing Spa",
            price: "Rs. 4,500",
            image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=80",
            description: "Relax your body and mind with our calming spa."
        },
        {
            name: "Body Massage",
            price: "Rs. 5,000",
            image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=700&q=80",
            description: "A soothing massage experience for complete relaxation."
        },
        {
            name: "Aromatherapy",
            price: "Rs. 4,000",
            image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=700&q=80",
            description: "Relaxing aromatherapy treatment with calming scents."
        }
    ],

    Bridal: [
        {
            name: "Bridal Makeup",
            price: "Rs. 15,000",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHW9GCxb3PEUg-XfbQmeSRp3Oo5xtawk8uL9uM7Lzrr3OVHaCW9c7tZYY&s=10",
            description: "Luxury bridal makeup for your unforgettable day."
        },
        {
            name: "Bridal Hair",
            price: "Rs. 7,000",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT52u83SRpNDy0iKgzXUBhoNCnDzsGDinayKnBiFRF8zAli_hkLwcWQo_OR&s=10",
            description: "Elegant bridal hairstyles designed for your look."
        },
        {
            name: "Complete Bridal",
            price: "Rs. 25,000",
            image: "https://cdn.shopify.com/s/files/1/0639/6320/1692/files/Pakistani-barat-event.png?v=1783503972",
            description: "Complete bridal beauty experience from head to toe."
        }
    ]

};


const serviceGrid = document.getElementById("serviceGrid");
const tabs = document.querySelectorAll(".tab");


function showServices(category) {

    serviceGrid.innerHTML = "";

    services[category].forEach(service => {

        const card = document.createElement("div");

        card.className = "service-card";

        card.innerHTML = `
            <img src="${service.image}" alt="${service.name}">

            <div class="service-info">

                <h3>${service.name}</h3>

                <p>${service.description}</p>

                <div class="price">${service.price}</div>

            </div>
        `;

        serviceGrid.appendChild(card);

    });

}


tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(item => {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        showServices(tab.dataset.category);

    });

});


const faqButtons = document.querySelectorAll(".faq-item button");

faqButtons.forEach(button => {

    button.addEventListener("click", () => {

        const item = button.parentElement;

        item.classList.toggle("open");

        const icon = button.querySelector("span");

        if (item.classList.contains("open")) {
            icon.textContent = "−";
        } else {
            icon.textContent = "+";
        }

    });

});


showServices("Hair");