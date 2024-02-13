import { 
  FlatList
} from 'react-native'

import CategoryItem from '../components/CategoryItem'
import Loader from '../components/Loader'

import { useGetCategoriesQuery } from '../services/shopService'
import Error from '../components/Error'

const CategoryScreen = ({ navigation }) => {

  const { data, error, isLoading } = useGetCategoriesQuery()

  const renderCategoryItem = ({item}) => (
    <CategoryItem category={item} navigation={navigation} />
  )

  if (isLoading) {
    return (
      <Loader />
    )
  }

  if (error) (
    <Error />
  )

  return (
    <FlatList 
      data={data}
      renderItem={renderCategoryItem}
      keyExtractor={item=>item.name}
      horizontal={false}
      numColumns={2}
    />
  )
}

export default CategoryScreen