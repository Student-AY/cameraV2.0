import { StatusBar } from 'expo-status-bar';
import React , {useEffect , useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera  } from 'expo-camera'

const [hasCameraPermission , setHasCameraPermission] = useState(null);  

const [camera , setCamera] = useState(null);  

const [image , setImage] = useState(null);  

const [ type , setType] = useState(Camera.Constants.Type.back);  


useEffect(() => {
  (async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus);
  })
},[])

if(hasCameraPermission === false){
  return <Text>permission denied!</Text>
}

const takePicture = async () => {
  if(camera){
    const data = await camera.takePictureAsync(null);
    setImage(data.uri)
  }
}


export default function App() {
  return (
    <View style={{}}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
