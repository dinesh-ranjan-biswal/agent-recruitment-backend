import { Router } from "express";
import setupUserRoutes from "./modules/userapis.routes.js";



const apiRoutes=Router();

// This Is Used For Global Error Handler
const use = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);


// add the sub routes to the main routes
setupUserRoutes(apiRoutes);





// apply use fn directly to all routes
apiRoutes.stack.forEach((apiLayer)=>{
    apiLayer.route.stack.forEach((routeLayer)=>{
        routeLayer.handle=use(routeLayer.handle);
    });
});

export default apiRoutes;