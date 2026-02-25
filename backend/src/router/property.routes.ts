import { Router } from "express";
import { PropertyRepository } from "../repository/property/property.repository";
import { PropertyService } from "../service/property/property.service";
import { UserRepository } from "../repository/user/user.repository";
import { PropertyController } from "../controller/propertly/property.controller";
import { cloudUpload } from "../middleware/upload";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();

const propertyRepository = new PropertyRepository();
const userRepository = new UserRepository();
const propertyService = new PropertyService(propertyRepository,userRepository)
const propertyController = new PropertyController(propertyService);



router.route('/add').post(authMiddleware,cloudUpload.array('propertyImage',4),propertyController.createNewPropery.bind(propertyController));

router.route('/user-properties/:userId').get(authMiddleware,propertyController.getUserProperties.bind(propertyController));

router.route('/all').get(authMiddleware,propertyController.getAllProperties.bind(propertyController));

router.route('/:propertyId').get(authMiddleware,propertyController.getSingleProperty.bind(propertyController))
.delete(authMiddleware,propertyController.deleteProperty.bind(propertyController))
.put(authMiddleware,cloudUpload.array('propertyImage',4),propertyController.updateProperty.bind(propertyController));
export default router;