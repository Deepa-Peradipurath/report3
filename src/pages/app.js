import React from "react"
import {Provider} from "react-redux"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { makeStyles } from "@material-ui/core/styles"

import AppRouter from "../components/Router/index"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { store } from "../store" 

const theme = createMuiTheme({
  palette: {
     primary: {
        light: '#fff',
        main: '#233B58', // application Primary color
        dark: '#000',
     },
     secondary: {
       main: '#4FB218', // application Secondary color
     },
     common :{
         white :'#fff',
     },
     button :{
        white :'#fff',
     },
     text: {
        primary: "#000000", //text primary color
        secondary: "#ffffff", //text secondary color
        highlight : "#3993CE", // highlight text color 
        variant1 :"#45B6FA" , // blue
        variant2 :'rgba(0, 0, 0, 0.5)' , // grey
        variant3 :'rgba(0, 0, 0, 0.2)' , // grey
    },
    icons :{
        primary : "#ffffff",
        secondary: "#000000",
        variant1 :"#3993CE" , // blue
    },
    background: {
        default: "#ffffff"
    },
    loader : {
        main: "#45B6FA"
    }
  },
  typography: { 
     useNextVariants: true
  }
});
const useStyles = makeStyles(theme => ({
    page: {
        width: '100%',
      }
  }));

const App = () => {
    const classes = useStyles();
    return (
        <Provider store={ store }>
            <MuiThemeProvider theme = { theme }>
                <Layout>
                    <SEO title="App" />
                        <div className = {classes.page}>
                            <AppRouter/>
                        </div>  
                </Layout>
            </MuiThemeProvider> 
        </Provider>
        
    )
}

export default App
