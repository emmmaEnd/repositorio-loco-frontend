import { Table, Column , Model, DataType, Default} from 'sequelize-typescript'

@Table({
    tableName: 'products'
})

class Product extends Model{
    @Column({
        type: DataType.STRING(100)
    })
    declare name : String

    @Column({
        type: DataType.FLOAT
    })
    declare price : number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability : Boolean

}

export default Product
