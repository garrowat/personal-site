import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    video: {

        maxWidth: theme.spacing.unit * 50,
        height: 'auto',
    },
})

const Videobox = ( props ) => (
    <video 
    loop 
    autoPlay 
    preload='true' 
    className={props.classes.video}
    >
        <source src={props.videofile} />
    </video>
  )
  
export default withStyles(styles)(Videobox)