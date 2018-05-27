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
    paddingTop: theme.spacing.unit * 3,
    maxWidth: '500px',
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

const apiUrl = `http://garrowat.pythonanywhere.com/zenobot/proverb/`;

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
      zenobot: {
        input: '',
        proverb: '',
        lastTenProverbs: [],
        isLoading: false,
      },
    };
  } 

  handlePageChange = (page) => {
    const state = this.state;
    state.page = page;
    const getHeaderImage = (pageId) => this.props.data.headers.edges[pageId].node.childImageSharp.resolutions;
    switch (this.state.page) {
      case 'about':
        state.filterColor = 'hue-rotate(0deg)';
        state.headerImage = getHeaderImage(0);
        state.headerTitle = 'Garrett Watson';
        state.headerText = 'Programmer, Educator, Game Nut';
        break;
      case 'projects':
        state.filterColor = 'hue-rotate(270deg)';
        state.headerImage = getHeaderImage(1);
        state.headerTitle = 'Projects & Tinkering';
        state.headerText = 'React, GatsbyJS, Material-UI, Flask, PyTorch, Fast.ai, Javascript, Python';
        break;
      case 'zenobot':
        state.filterColor = 'hue-rotate(540deg)';
        state.headerImage = getHeaderImage(2);
        state.headerTitle = 'Zenobot';
        state.headerText = 'Wisdom Dispensing AI';
        break;
      default:
        state.filterColor = 'hue-rotate(0deg)';
        state.headerImage = getHeaderImage(0);
        state.headerTitle = 'Garrett Watson';
        state.headerText = 'Programmer, Educator, Game Nut';
      break;
    }
    this.setState({ state });
  }

  handleFieldChange = (input) => {
    let zenobot = this.state.zenobot;
    zenobot.input = input;
    this.setState({ zenobot });
  }

  getProverb = (input) => {
    let zenobot = this.state.zenobot;
    // Turn on loading
    zenobot.isLoading = true;
    this.setState({ zenobot });

    const lastTenProverbsUpdate = (proverb) => {
      // Maintain a list of only the last ten proverbs for this session
      let list = zenobot.lastTenProverbs;
      list.length < 10
      ? zenobot.lastTenProverbs.unshift(proverb)
      : zenobot.lastTenProverbs.pop() && zenobot.lastTenProverbs.unshift(proverb)
    };

    fetch(`${apiUrl}${input}`)
      .then( (response) => {
        if (response.ok) return response.json();
        throw new Error("Something went wrong, can't generate proverb.");
      })
      .then( result => {
        const proverb = result.proverb;
        zenobot.proverb = proverb;
        zenobot.isLoading = false;
        lastTenProverbsUpdate(proverb);
        console.log(zenobot.lastTenProverbs)
        this.setState({ zenobot })
      })
      .catch(error => console.log(error));
  }


  render() {
    const { classes, children } = this.props;
    const handlePageChange = this.handlePageChange;
    const projectImages = this.props.data.projects.edges;
    const getProverb = this.getProverb;
    const handleFieldChange = this.handleFieldChange;
    const { zenobot, filterColor } = this.state;

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
                  style={{ filter: this.state.filterColor, transition: 'all 1s' }}
                  className={classes.button} 
                  variant={this.state.page==='about' ? 'raised' : 'flat'}
                  color="primary"
                  >
                    About
                  </Button>
                </Link>
                <Link to="/projects/" className={classes.link}>
                  <Button 
                  style={{ filter: this.state.filterColor, transition: 'all 1s' }}
                  className={classes.button} 
                  variant={this.state.page==='projects' ? 'raised' : 'flat'} 
                  color="primary"
                  >
                    Projects
                  </Button>
                </Link>
                <Link to="/zenobot/" className={classes.link}>
                  <Button 
                  style={{ filter: this.state.filterColor, transition: 'all 1s' }}
                  className={classes.button} 
                  variant={this.state.page==='zenobot' ? 'raised' : 'flat'} 
                  color="primary"
                  >
                    Zenobot
                  </Button>
                </Link>
              </div>
              { children({
                ...this.props, 
                handlePageChange, 
                projectImages, 
                getProverb, 
                handleFieldChange,
                zenobot,
                filterColor
                }) 
              }
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
