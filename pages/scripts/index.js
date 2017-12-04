//make the cards fit better with hack
document.body.style.zoom = .8

async function initialize(){
    const d_interface = new Doc_Interface()
    const resp = await d_interface.renew()
}

//call the init function
initialize()