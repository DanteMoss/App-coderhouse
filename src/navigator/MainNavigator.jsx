import { NavigationContainer } from '@react-navigation/native'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TabNavigator from './TabNavigator'
import AuthNavigator from './AuthNavigator'

import { fetchSession } from '../db'

import { setProfilePicture, setUser } from '../features/authSlice'
import { useGetProfilePictureQuery } from '../services/userService'


const MainNavigator = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.authReducer.user)
  const localId = useSelector(state => state.authReducer.localId)

  const {data, error, isLoading} = useGetProfilePictureQuery(localId)


  useEffect(() => {
    if (data) {
      dispatch(setProfilePicture(data.image))
    }
  },[data])

  useEffect(()=>{
    (async ()=>{
        try{
            const session = await fetchSession()
            console.log("Session:", session)
            if(session?.rows.length){
                console.log("Se han encontrado datos de usuario")
                const user = session.rows._array[0]
                dispatch(setUser(user))
            }
        }catch(error){
            console.log("Error al obtener datos del usuario local: ", error.message)
        }
    })()
},[])

  return (
    <NavigationContainer>

      {user && !isLoading ? <TabNavigator /> : <AuthNavigator/>}

    </NavigationContainer>
  )
}
export default MainNavigator
