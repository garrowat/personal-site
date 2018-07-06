import React from 'react';
import Typography from 'material-ui/Typography';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
import Fade from 'material-ui/transitions/Fade';

import red from 'material-ui/colors/red';

import { withStyles } from 'material-ui/styles';

import projectList from '../json/projects.json';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: 0,
    flexGrow: 1,
  },
  card: {
    maxWidth: 350,
    textAlign: 'left',
  },
  media: {
    maxWidth: 400,
    height: 175,
  },
  button: {
    margin: 0,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class Projects extends React.Component {
    constructor(props) {
      super(props)
    }
    
    componentDidMount() {
      this.props.handlePageChange('projects');
    }
  
    render() {
      const classes = this.props.classes;
      const images = this.props.projectImages;

      return (
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid container className={classes.demo} justify="center" spacing={24}>
              {projectList.map((value, index) => {
            
                const currentImage = (images[index] && images[index].node.childImageSharp.resolutions.src) || images[0].node.childImageSharp.resolutions.src;
                return(
                  <Grid key={value.name} item>
                    <Fade in={true}>
                      <Card className={classes.card}>
                        {value.link.startsWith('/')
                          ? <Link to={value.link}>
                          <CardMedia 
                            className={classes.media}
                            title={value.name || ''}
                            image={currentImage || ''}
                          />
                          </Link>
                          : <a href={value.link} target="_blank">
                            <CardMedia 
                              className={classes.media}
                              title={value.name || ''}
                              image={currentImage || ''}
                            />
                          </a>
                        }
                        <CardContent>
                          <Typography variant="headline" component="h2">
                            {value.name}
                          </Typography>
                          <Typography component="p">
                            {value.description}
                          </Typography>
                          <CardActions style={{ padding: 0, paddingTop: 5 }}>
                            <a href={value.link} style={{ textDecoration: "none", marginLeft: 0 }}>
                              <Button 
                              variant="outlined" 
                              dense={true} 
                              color="primary" 
                              className={classes.button} 
                              >
                                {value.button}
                              </Button>
                            </a>
                          </CardActions>
                        </CardContent>
                      </Card>
                    </Fade>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      );
    }
  };
  
export default withStyles(styles)(Projects);