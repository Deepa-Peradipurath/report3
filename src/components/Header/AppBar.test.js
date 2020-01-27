import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import AppBar from "./AppBar";
import Logo from "./logo";
import ProfileInfo from "./profileInfo";
import { findComponentByAttr } from "./../../utils/index";

describe('AppBar' , () => {
    it("AppBar renders correctly", () => {
        const tree = renderer
          .create(<AppBar/>)
        expect(tree).toMatchSnapshot();
    });
    // it("AppBar renders correctly", () => {
    //     const component = renderer
    //       .create(<AppBar/>);
    //     const tree = component.toJSON();  
    //     expect(tree).toMatchSnapshot();
    // });
    // it("Logo renders correctly", () => {
    //     const component = renderer
    //       .create(<Logo/>);
    //     const tree = component.toJSON();  
    //     expect(tree).toMatchSnapshot();
    // });
    // it("ProfileInfo renders correctly", () => {
    //     const component = renderer
    //       .create(<ProfileInfo/>);
    //     const tree = component.toJSON();  
    //     expect(tree).toMatchSnapshot();
    // });

    it('Should render without errors', () => {
        const component =  shallow(<AppBar/>);
        const wrapper = findComponentByAttr(component ,'AppBar');
        expect(wrapper.length).toBe(1);
    });

    describe('Logo' , () => {
        it('Should render without errors', () => {
            const component =  shallow(<Logo/>);
            const wrapper = findComponentByAttr(component ,'logo');
            expect(wrapper.length).toBe(1);
        });
    });

    describe('ProfileInfo' , () => {
        it('Should render without errors', () => {
            const component =  shallow(<ProfileInfo/>);
            const wrapper = findComponentByAttr(component ,'profileInfo');
            expect(wrapper.length).toBe(1);
        });
    });
});