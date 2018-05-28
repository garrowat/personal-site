import React from 'react';
import Typography from 'material-ui/Typography';

const Proverb = ({ proverb, variant }) => (
    <Typography variant={variant} paragraph={true} style={{ fontFamily: "vt323", fontSize: "150%"}}>
        {proverb}
    </Typography>
  )
  
export default Proverb