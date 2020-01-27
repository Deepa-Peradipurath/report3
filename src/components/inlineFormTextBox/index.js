import React from "react";
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import './inlineFormTextBox.scss';

const InlineFormTextBox = ({
    label ,textbox ,dropdown ,listData, selectedData, setData
}) => {
    // const [selected, setSelected] = useState("");

    const handleChange = (event) =>{
        setData(event.target.value)
    }

    return(
        <List  className = 'inlineTextBox'>
            <ListItem className ='listItemLeft'>
            <label className="label-name">{label}</label>
            </ListItem>
            <ListItem className ='listItemRight'>
            {
                dropdown
                ?
                <FormControl variant="outlined" size="small" className="dropDown">
                    <Select className="template-drop-down-content" value = {selectedData} onChange = {handleChange}>
                    {listData && listData.map((value, index) => {
                        return (<MenuItem value={value.id}>{value.name}</MenuItem>)

                    })}
                    </Select>
                </FormControl> 
                :
                <label className="label-name">: {selectedData}</label>

            }

            {
                textbox
                &&
                <TextField
                    className="textBox"
                    required
                    variant="outlined"
                    size="small"
                />
            }
            
            </ListItem>
        </List> 
    )
}

export default InlineFormTextBox