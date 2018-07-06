import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import Particles from 'react-particles-js';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import Hidden from 'material-ui/Hidden';
import Fade from 'material-ui/transitions/Fade';

import particlesConfig from '../json/particlesjs-config.json';

const styles = theme => ({
  root: {
    textAlign: 'center',
    margin: 'auto',
    paddingTop: theme.spacing.unit * 10,
    paddingBottom: theme.spacing.unit * 10,
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 5,
    maxHeight: '100%',
    maxWidth: '750px',
    zIndex: '1 !important',
  },
  container: {
    paddingTop: 0,
  },
  copyright: {
    marginTop: theme.spacing.unit * 10,
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttonActive: {
    background: theme.palette.accent,
  },
  description: {
    margin: 'auto',
    width: '100%',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: theme.spacing.unit,
    maxWidth: '500px',
  },
  links: {
    margin: 'auto',
    marginTop: theme.spacing.unit,
  },
  particles: {
    zIndex: '-1',
    position: 'fixed',
    width: '100%',
    height: '100%',
    transition: 'all 3s ease-in-ease-out',
  },
  link: {
    textDecoration: 'none',
  },
});

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'about', 
      filterColor: 'hue-rotate(0deg)',
      buttonBackground: '#000000',
      headerImage: this.props.data.headers.edges[0].node.childImageSharp.resolutions,
      headerTitle: 'Garrett Watson',
      headerText: 'Programmer, Educator, Game Nut',
    };
  } 

  handlePageChange = (newPage) => {
    let { 
      filterColor, 
      headerImage, 
      headerTitle, 
      headerText 
    } = {...this.state};
    const page = newPage;
    const getHeaderImage = (pageId) => this.props.data.headers.edges[pageId].node.childImageSharp.resolutions;
    switch (page) {
      case 'about':
        filterColor = 'hue-rotate(0deg)';
        headerImage = getHeaderImage(0);
        headerTitle = 'Garrett Watson';
        headerText = 'Programmer, Educator, Game Nut';
        break;
      case 'projects':
        filterColor = 'hue-rotate(270deg)';
        headerImage = getHeaderImage(1);
        headerTitle = 'Projects & Tinkering';
        headerText = 'React, GatsbyJS, Material-UI, Flask, PyTorch, Fast.ai, Javascript, Python';
        break;
      default:
        filterColor = 'hue-rotate(0deg)';
        headerImage = getHeaderImage(0);
        headerTitle = 'Garrett Watson';
        headerText = 'Programmer, Educator, Game Nut';
      break;
    }
    this.setState({ 
      page, 
      filterColor, 
      headerImage, 
      headerTitle, 
      headerText 
    });
  }


  render() {
    const { classes, children } = this.props;
    const handlePageChange = this.handlePageChange;
    const projectImages = this.props.data.projects.edges;
    const getProverb = this.getProverb;
    const handleFieldChange = this.handleFieldChange;
    const { filterColor } = this.state;

    return (
      <div>
        <Hidden smDown>
          <Particles 
            params={particlesConfig}
            className={classes.particles}
            style={{ filter: this.state.filterColor, transition: 'all 1s' }}
          />
        </Hidden>
        <Fade in>
          <div className={classes.container}>
            <Paper className={classes.root}>
              <Img resolutions={this.state.headerImage}/>
              <Typography variant="display1" gutterBottom>
                {this.state.headerTitle}
              </Typography>
              <Typography variant="subheading" gutterBottom>
                {this.state.headerText}
              </Typography>
              <div>
                <Link to="/" className={classes.link}>
                  <Button 
                  style={{ filter: filterColor, transition: 'all 1s' }}
                  className={classes.button} 
                  variant={this.state.page==='about' ? 'raised' : 'flat'}
                  color="primary"
                  >
                    About
                  </Button>
                </Link>
                <Link to="/projects/" className={classes.link}>
                  <Button 
                  style={{ filter: filterColor, transition: 'all 1s' }}
                  className={classes.button} 
                  variant={this.state.page==='projects' ? 'raised' : 'flat'} 
                  color="primary"
                  >
                    Projects
                  </Button>
                </Link>
                <a href="https://zenobot.garrettwatson.io" className={classes.link} target="_blank">
                  <Button 
                  style={{ filter: filterColor, transition: 'all 1s' }}
                  className={classes.button} 
                  variant={this.state.page==='zenobot' ? 'raised' : 'flat'} 
                  color="primary"
                  >
                    Zenobot
                  </Button>
                </a>
              </div>
              { children({
                ...this.props, 
                handlePageChange, 
                projectImages, 
                getProverb, 
                handleFieldChange,
                filterColor
                }) 
              }
              <div className={classes.copyright}>
                <Typography variant="caption">© 2018 Garrett Watson. All rights reserved.</Typography>
              </div>
            </Paper>
          </div>
        </Fade>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query ImagesQuery {
    site {
      siteMetadata {
        title
      }
    }
    headers: allFile(filter: {sourceInstanceName: {eq: "headers"}}, sort: {fields: [name]}) {
      edges {
        node {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            resolutions(width: 207, height: 243) {
              ...GatsbyImageSharpResolutions
            } 
          }
        }
      }
    }
    # the filter is usefull if you have multiple source-filesystem instances
    # the name "images" is set in the gatsby-config
    projects: allFile(filter: {sourceInstanceName: {eq: "projects"}}, sort: {fields: [name]}) {
      edges {
        node {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            resolutions(width: 400, height: 200) {
              src
            }
          }
        }
      }
    }
  }
`;

export default withRoot(withStyles(styles)(Index));
