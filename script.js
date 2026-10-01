const products=[
 {id:1,name:"Agua Cielo 625 ml",cat:"Aguas",price:1.80,emoji:"💧",unit:"Unidad"},
 {id:2,name:"Agua Cielo 2.5 L",cat:"Aguas",price:4.50,emoji:"💧",unit:"Unidad"},
 {id:3,name:"KR Naranja 3 L",cat:"Gaseosas",price:7.50,emoji:"🥤",unit:"Unidad"},
 {id:4,name:"KR Cola 3 L",cat:"Gaseosas",price:7.50,emoji:"🥤",unit:"Unidad"},
 {id:5,name:"Sabor de Oro 3 L",cat:"Gaseosas",price:7.20,emoji:"🍊",unit:"Unidad"},
 {id:6,name:"Cielo Pack x6",cat:"Aguas",price:10.50,emoji:"📦",unit:"Pack"},
 {id:7,name:"KR Pack x6",cat:"Gaseosas",price:38.00,emoji:"📦",unit:"Pack"},
 {id:8,name:"Cielo Sin Gas 7 L",cat:"Aguas",price:8.90,emoji:"💧",unit:"Unidad"}
];
let cart=JSON.parse(localStorage.getItem("ismCart")||"[]");
let orders=JSON.parse(localStorage.getItem("ismOrders")||"[]");
let user=JSON.parse(localStorage.getItem("ismUser")||"null");
let view="inicio";

function money(n){return "S/ "+n.toFixed(2)}
function save(){localStorage.setItem("ismCart",JSON.stringify(cart));localStorage.setItem("ismOrders",JSON.stringify(orders));localStorage.setItem("ismUser",JSON.stringify(user));updateCount()}
function updateCount(){document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0)}
function productCard(p){return `<article class="product"><div class="product-img">${p.emoji}</div><span class="muted">${p.cat} · ${p.unit}</span><h3>${p.name}</h3><div class="price">${money(p.price)}</div><button class="btn dark" onclick="add(${p.id})">Agregar al carrito</button></article>`}
function add(id){let x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();toast("Producto agregado al carrito");}
function toast(t){let e=document.createElement("div");e.textContent=t;e.style="position:fixed;bottom:25px;right:25px;background:#182230;color:#fff;padding:14px 18px;border-radius:10px;z-index:100;font-weight:700";document.body.appendChild(e);setTimeout(()=>e.remove(),1800)}

function render(){
 const app=document.getElementById("app");
 if(view==="inicio") app.innerHTML=home();
 if(view==="catalogo") app.innerHTML=catalog();
 if(view==="promociones") app.innerHTML=promos();
 if(view==="pedidos") app.innerHTML=ordersPage();
 if(view==="registro") app.innerHTML=register();
 updateCount();
}
function home(){return `<section class="hero"><div><span>🚚 Compra directa</span><h1>Haz tu pedido y recibe tus productos sin salir de tu negocio.</h1><p>ISM Directo conecta a tiendas y consumidores con un catálogo digital, promociones y seguimiento del pedido.</p><button class="btn primary" onclick="view='catalogo';render()">Ver productos</button> <button class="btn" onclick="view='registro';render()">Crear cuenta</button></div><div class="hero-card"><h3>📍 Seguimiento de entrega</h3><p>Consulta el estado de tu pedido y visualiza la ubicación estimada del repartidor.</p><div class="map"><span class="pin">📍</span></div></div></section>
<section class="section"><div class="section-head"><h2>Productos destacados</h2><button class="btn light" onclick="view='catalogo';render()">Ver catálogo</button></div><div class="cards">${products.slice(0,4).map(productCard).join("")}</div></section>
<section class="section"><div class="grid2"><div class="promo"><strong>🔥 PROMOCIÓN</strong><h2>Compra para tu tienda</h2><p>Encuentra packs y presentaciones para abastecer tu negocio.</p><button class="btn red" onclick="view='promociones';render()">Ver promociones</button></div><div class="promo"><strong>⚡ PEDIDOS RÁPIDOS</strong><h2>Repite tu último pedido</h2><p>Guarda tus productos favoritos y vuelve a pedirlos en pocos pasos.</p><button class="btn dark" onclick="view='pedidos';render()">Mis pedidos</button></div></div></section>`}
function catalog(){return `<section class="section"><h1>Catálogo</h1><p class="muted">Selecciona productos y agrégalos a tu pedido.</p><input class="search" id="search" placeholder="🔎 Buscar producto..." oninput="filterProducts(this.value)"><div class="tabs"><button class="btn light active" onclick="filterProducts('')">Todos</button><button class="btn light" onclick="filterProducts('Aguas')">Aguas</button><button class="btn light" onclick="filterProducts('Gaseosas')">Gaseosas</button></div><div class="cards" id="productGrid">${products.map(productCard).join("")}</div></section>`}
function filterProducts(q){let a=q.toLowerCase();let list=products.filter(p=>p.name.toLowerCase().includes(a)||p.cat.toLowerCase().includes(a));document.getElementById("productGrid").innerHTML=list.map(productCard).join("")}
function promos(){return `<section class="section"><h1>Promociones</h1><p class="muted">Ofertas referenciales para el prototipo.</p><div class="cards"><div class="promo"><strong>PACK TIENDA</strong><h2>6 unidades de agua</h2><p>Ideal para abastecer tu negocio.</p><h2>S/ 10.50</h2><button class="btn red" onclick="add(6)">Agregar</button></div><div class="promo"><strong>GASEOSAS</strong><h2>Pack KR x6</h2><p>Presentación para compras por volumen.</p><h2>S/ 38.00</h2><button class="btn red" onclick="add(7)">Agregar</button></div><div class="promo"><strong>CLIENTE NUEVO</strong><h2>Envío promocional</h2><p>Registra tu dirección para simular la entrega.</p><button class="btn dark" onclick="view='registro';render()">Registrarme</button></div><div class="promo"><strong>⭐ FAVORITOS</strong><h2>Repite tus compras</h2><p>Guarda productos frecuentes y vuelve a pedirlos rápidamente.</p><button class="btn dark" onclick="view='catalogo';render()">Comprar</button></div></div></section>`}
function register(){return `<section class="section"><div class="panel" style="max-width:650px;margin:auto"><h1>Crear cuenta</h1><p class="muted">Elige cómo usarás ISM Directo.</p><div class="tabs"><button id="storeTab" class="btn dark" onclick="accountType='tienda';this.classList.add('active')">🏪 Soy tienda</button><button id="consumerTab" class="btn light" onclick="accountType='consumidor';this.classList.add('active')">👤 Soy consumidor</button></div><form class="form" onsubmit="registerUser(event)"><input id="name" required placeholder="Nombre o razón social"><input id="phone" required placeholder="Celular"><input id="email" type="email" required placeholder="Correo electrónico"><input id="address" required placeholder="Dirección de entrega"><select id="district"><option>Selecciona distrito</option><option>Cerro Colorado</option><option>Yanahuara</option><option>Arequipa</option><option>Paucarpata</option><option>José Luis Bustamante y Rivero</option><option>Miraflores</option></select><input id="pass" type="password" required placeholder="Contraseña"><button class="btn red">Crear cuenta</button></form></div></section>`}
let accountType="tienda";
function registerUser(e){e.preventDefault();user={type:accountType,name:name.value,phone:phone.value,email:email.value,address:address.value,district:district.value};save();toast("Cuenta creada");setTimeout(()=>{view="catalogo";render()},500)}
function cartHTML(){let total=cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0);return `<div class="panel"><button class="close" onclick="closeModal()">✕</button><h2>Tu carrito</h2>${cart.length?cart.map(i=>{let p=products.find(x=>x.id===i.id);return `<div class="cart-row"><div><b>${p.name}</b><br><span class="muted">${money(p.price)} c/u</span></div><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button>${i.qty}<button onclick="changeQty(${p.id},1)">+</button></div><b>${money(p.price*i.qty)}</b></div>`}).join("")+`<h2>Total: ${money(total)}</h2><button class="btn red" onclick="checkout()">Continuar pedido</button>`:`<p>Tu carrito está vacío.</p><button class="btn dark" onclick="closeModal();view='catalogo';render()">Ver productos</button>`}</div>`}
function changeQty(id,n){let x=cart.find(i=>i.id===id);x.qty+=n;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save();openCart()}
function openCart(){document.getElementById("modalContent").innerHTML=cartHTML();document.getElementById("modal").classList.remove("hidden")}
function closeModal(){document.getElementById("modal").classList.add("hidden")}
function checkout(){if(!user){closeModal();view="registro";render();toast("Primero crea tu cuenta");return}let total=cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0);orders.unshift({id:"ISM-"+Date.now().toString().slice(-6),date:new Date().toLocaleString("es-PE"),total,status:"Preparando",address:user.address});cart=[];save();closeModal();view="pedidos";render();toast("Pedido registrado")}
function ordersPage(){if(!orders.length)return `<section class="section"><div class="panel"><h1>Mis pedidos</h1><p>Aún no tienes pedidos.</p><button class="btn red" onclick="view='catalogo';render()">Hacer mi primer pedido</button></div></section>`;return `<section class="section"><h1>Mis pedidos</h1><div class="grid2">${orders.map((o,i)=>`<div class="panel"><span class="muted">${o.date}</span><h2>${o.id}</h2><p><b>Total:</b> ${money(o.total)}</p><p><b>Estado:</b> ${o.status}</p><p>📍 ${o.address}</p><div class="map"><span class="pin">🚚</span></div><div class="status"><span class="step active">Pedido recibido</span><span class="step ${i===0?'active':''}">Preparando</span><span class="step">En camino</span><span class="step">Entregado</span></div><button class="btn light" onclick="simulate(${i})">Actualizar seguimiento</button></div>`).join("")}</div></section>`}
function simulate(i){orders[i].status="En camino";save();render();toast("El pedido está en camino")}
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>{view=b.dataset.view;render()}));
document.getElementById("cartBtn").addEventListener("click",openCart);
document.getElementById("modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
render();
