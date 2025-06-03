import {Router} from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handlerInputErrors } from './middleware'


const router =Router()
/**
* @swagger
* components: 
*     schemas:
*       Product:
*         type: object
*         properties: 
*           id:
*             type: integer
*             description: The product ID
*             example: 1
*           name:
*             type: string
*             description: The product name
*             example: XIAOMI MI 13 PRO
*           price:
*             type: number
*             description: The product price
*             example: 300
*           availability:
*             type: boolean
*             description: The product status
*             example: true
* 
*/

/**
 * @swagger
 * /api/products:
 *    get:
 *      summary: Ge a list of products
 *      tags: 
 *        - Products  
 *      description: Return a list of products
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                        $ref: '#/components/schemas/Product'
 *                       
 */

router.get('/',getProducts)


/**
 * @swagger
 * /api/products/{id}:
 *    get:
 *      summary: Get a product by her ID
 *      tags: 
 *        - Products  
 *      description: Return a product by her ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: the id of the product to retrieve
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *              
 *          400:
 *              description: Bad requese, invalid ID       
 */

router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handlerInputErrors,    
    getProductById
)

/**
 * @swagger
 * /api/products/:
 *    post:
 *      summary: Create a new product
 *      tags: 
 *        - Products  
 *      description: Return a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Iphone 15 pro max"
 *                          price:
 *                              type: number
 *                              example: 1500
 *      responses:
 *          201:
 *              description: Successful register
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Invalid register, something is bad      
 */

router.post('/',
    
    body('name')
                .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
                
    
    body('price')
                .isNumeric().withMessage('valor no valido')
                .notEmpty().withMessage('El precio del producto no puede ir vacio')
                .custom(value => value > 0).withMessage('precio no valido'),            

    handlerInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *    put:
 *      summary: Update a register with new input data
 *      tags: 
 *        - Products  
 *      description: Return the update product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: the id of the product to retrieve
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Iphone 15 pro max"
 *                          price:
 *                              type: number
 *                              example: 1500
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful register
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request 
 *          404:
 *              description: Product not found      
 */

router.put('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    body('name')
                .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
                
    
    body('price')
                .isNumeric().withMessage('valor no valido')
                .notEmpty().withMessage('El precio del producto no puede ir vacio')
                .custom(value => value > 0).withMessage('precio no valido'),
    body('availability')
    .isBoolean().withMessage('Valor para disponibilidad no valido'),
    handlerInputErrors,
    updateProduct)

/**
 * @swagger
 * /api/products/{id}:
 *    patch:
 *      summary: Update product availability
 *      tags: 
 *        - Products  
 *      description: Return the update availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: the id of the product to retrieve
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Successful register
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request    
 *          404:
 *              description: Product not found      
 */

router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handlerInputErrors,
    updateAvailability)

/**
 * @swagger
 * /api/products/{id}:
 *    delete:
 *      summary: Delete a product
 *      tags: 
 *        - Products  
 *      description: Return a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: the id of the product to retrieve
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Successful register
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: "Products deleted correct"    
 *          400:
 *              description: Bad request    
 *          404:
 *              description: Product not found      
 */

router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handlerInputErrors,
    deleteProduct
)
export default router