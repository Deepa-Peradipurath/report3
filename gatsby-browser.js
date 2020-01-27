/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

//css
import("./src/styles/index.scss")
exports.onClientEntry = () => {
    console.log("onClientEntry.....")
    window.onload = () => { console.log("window.onload.....") }
  }
