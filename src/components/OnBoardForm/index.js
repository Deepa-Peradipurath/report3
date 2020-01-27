import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import UploadLogo from '../../images/Upload_File-01.svg';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import CustomButton from '../Button';
import { navigate } from '@reach/router';
import FormTextBox from '../formTextBox';
import './OnBoardForm.scss';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative'
    },
    formWrapper: {
        backgroundColor :'white',
        margin:"2% 0",
        padding :"30px"
      },
    header :{
        marginTop :'25px !important'
    },
    fullwidth :{
        width:'100%'
    }, 
    spacer :{
        marginBottom:'6%'
    } ,  
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    }
}));

const OnBoardForm = () => {
    const classes = useStyles();

    const [fileUploadTriggered, setFileUploadTriggered] = useState(false);

    const [uploadedImage, setUploadedImage] = useState();
    const [uploadedImageData, setUploadedImageData] = useState();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [circularProgressCount, setCircularProgressCount] = useState(0);

    const timer = React.useRef();

    const handleUploadFile = event => {
        const reader = new FileReader();

        let startTime, endTime;

        reader.onloadstart = e => {
            startTime = new Date().getTime();
            setLoading(true);
            let tempCount = 0;
            timer.current = setInterval(() => {
                tempCount = tempCount + 20;
                setCircularProgressCount(tempCount++);
            }, 300);
        };

        reader.onprogress = e => {
        };

        reader.onloadend = e => {
            endTime = new Date().getTime();

            setTimeout(() => {
                setSuccess(true);
                setLoading(false);
                setUploadedImageData(e.target.result);
                clearInterval(timer.current);
            }, 2000);
        };

        reader.onload = e => {
            // setImageSelected(e.target.result);
            setFileUploadTriggered(true);
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    useEffect(() => {
        if (uploadedImageData) {
            setTimeout(() => {
                setUploadedImage(uploadedImageData);
            }, [500]);
        }
    }, [uploadedImageData]);

    return (
        <form className="form-container">
            <Grid xs={12} item>
                <h5 className ={classes.header}>Application OnBoarding Form</h5>
            </Grid>
            <Grid xs={12} item>
                <div className={classes.formWrapper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Grid xs={12} item>
                                <h5>Title</h5>
                            </Grid>
                            <Grid item xs={12} className ={classes.spacer}>
                                <FormTextBox label ="Name" helperTxt ="0 to 100 Characters"  />
                                <Grid item xs={12}>
                                    <TextField
                                        className ={classes.fullwidth}
                                        required
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className ={classes.spacer}>
                                <FormTextBox label ="Description" helperTxt ="150 to 300 Characters"  /> 
                                <Grid item xs={12}>
                                <TextField
                                    className ={classes.fullwidth}
                                    multiline
                                    rows="10"
                                    variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <div className="logo-content">
                            {fileUploadTriggered ? (
                                <div className="file-upload-container">
                                    {circularProgressCount}
                                    {uploadedImage ? (
                                        <img height="120" width="120" src={uploadedImage} />
                                    ) : (
                                            <>
                                                {success && <CheckIcon />}
                                                {loading && <CircularProgress variant="static" value={circularProgressCount} size={68} />}
                                            </>
                                        )}
                                </div>
                            ) : (
                                    <div class="file-input-container">
                                        <label for="inputFile" style={{ 'text-align': 'center' }}>
                                            <div className="image-content">
                                                <img className="image-logo" src={UploadLogo} alt="upload logo" />
                                            </div>
                                            <div className="label-container">
                                                <div className="drag-drop-content">Drag & Drop</div>
                                                <div className="OR-content">
                                                    <hr className="hr-content" /> OR <hr className="hr-content" />
                                                </div>
                                                <div className="upload-logo-content">Upload Logo</div>
                                            </div>
                                        </label>
                                        <input
                                            id="inputFile"
                                            name="inputType"
                                            type="file"
                                            className="custom-file-input"
                                            onChange={handleUploadFile}></input>
                                    </div>
                                )}
                            </div>
                            <div className="helper-text">Max Size: 5 MB | File Format: SVG, PNG, JPG</div>
                        </Grid>
                        <Grid item xs={12} className ="alignRight">
                            <CustomButton 
                                type="secondary" 
                                text="Cancel" 
                                action={() => { 
                                    navigate(`/app`)
                                }}/> 
                            <CustomButton 
                                type="primary" 
                                text="Onboard Application" 
                                action={() => { 
                                    // action here 
                                }}/>        
                        </Grid>        
                    </Grid>
                </div>
            </Grid>
        </form>
    );
};

export default OnBoardForm;
