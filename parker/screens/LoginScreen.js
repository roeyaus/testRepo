import {
	View
} from 'react-native'

import ParkzTextField from '../../app/components/ParkzTextField'
import ParkzButton from '../../app/components/ParkzButton'
import {loginScreenView} from '../assets/styles/styles.js'

class LoginScreen extends React.Component {
constructor(props) {
	super(props)
}

valetSignIn() {
	firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function () { 
                  //Sign in was succesful
                  console.log("valet sign in for " + this.state.email + " successful")
                  //now we must update the app state with the signed in user
                  
                },function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  console.log("sign in user error : " + errorCode + ", " + errorMessage)
                  _this.setState({
                    error : "Sorry, please try again"
                  })
                  // ...
                });

}

render () {
	return (
		<View style = {loginScreenView}>
			<ParkzTextField 
            ref = "Email"
            leftText={"Email"}
            onFocus={() => {
              this.setState({
                error : ""
              })
            }}
            onChangeText={
                (text) => {
            this.setState({
                email : text
            })}}
            placeholder={this.state.email}
            autoFocus={true}
            returnKeyType='next' />

			<ParkzTextField
         leftText={"Password"}
            onChangeText={(text) => {
            this.setState( {
                password : text
            })}}
            placeholder={this.state.password}
            borderWidth = {0}
            secureTextEntry={true}
            returnKeyType='done'
            onFocus={() => {
              this.setState({
                error : ""
              })
            }}
            onSubmitEditing={() => valetSignIn() }/>
          <Text>{this.state.error}</Text>
           <ParkzButton
          text='Log In'
          buttonStyle = {{ backgroundColor: 'black' }}
          onPress = {() => this.login() }
          />
			
		</View> 
	)
}

}