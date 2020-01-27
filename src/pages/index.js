import React from "react"
import {Provider} from "react-redux"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 

import Layout from "../components/layout"
//import Image from "../components/image"
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

const IndexPage = () => (
  <Provider store={ store }>
    <Layout>
      <SEO title="Home" />
      <MuiThemeProvider theme = { theme }>
      <h1>UI-Admin Notification Report Landing Page</h1>
      </MuiThemeProvider> 
      
    </Layout>
  </Provider>
  
)

export default IndexPage
