/**
 * Lib imports
 */
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SettingsIcon from '@material-ui/icons/Settings';

/**
 * Project imports
 */
import LoadTestDialog from './LoadTestDialog'
import AddMemeDialog from './AddMemeDialog'
import ApplyConfigDialog from './ApplyConfigDialog'
import Meme from './Meme'
import Monitor from './Monitor'
import {generateDownloadURL} from "./utils";
import Configs from './configs'

const styles = theme => ({
    flex: {
        flex: 1,
    },
    paper: {
        height: 300,
        width: 200,
    },
    appbarPlaceholder: {
        marginBottom: 80,
    },
    appbarButton: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadTestDialogOpen: false,
            addMemeDialogOpen: false,
            applyConfigDialogOpen: false,
            memes: []
        };
    }

    handleLoadTestDialogOpen = () => {
        this.setState({loadTestDialogOpen: true});
    };

    onLoadTestDialogClose = () => {
        this.setState({loadTestDialogOpen: false});
    };

    handleAddMemeDialogOpen = () => {
        this.setState({addMemeDialogOpen: true});
    };

    onAddMemeDialogClose = () => {
        this.setState({addMemeDialogOpen: false});
    };

    handleApplyConfigDialogOpen = () => {
        this.setState({applyConfigDialogOpen: true});
    };

    onApplyConfigDialogClose = () => {
        this.setState({applyConfigDialogOpen: false});
    };

    onAddMeme = ({imageId, topText, bottomText}) =>
        this._createMeme({imageId, topText, bottomText})
            .then(this.onAddMemeDialogClose);

    _createMeme = ({imageId, topText, bottomText}) => {
        const {apiHTTP} = Configs.getConfig();
        return fetch(`${apiHTTP}/memes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imageId,
                topText,
                bottomText
            })
        }).then(() => this._loadMemes());
    };

    _loadMemes = () => {
        const {apiHTTP} = Configs.getConfig();
        return fetch(`${apiHTTP}/memes`)
            .then(response => response.json())
            .then(memes => this.setState({memes}))
            .catch((error) => console.log('Failed to fetch Memes', error));
    };

    _getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    _getRndText(length) {
        let text = '';
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < length; i++)
            text += possible.charAt(this._getRndInteger(0, possible.length));

        return text;
    }

    onLoadTest = async (interval) => {
        const {apiHTTP} = Configs.getConfig();
        const images = await fetch(`${apiHTTP}/images`).then(response => response.json());
        const loadTestIntervalId = setInterval(() => {
            const randomImage = images[this._getRndInteger(0, images.length)];
            this._createMeme({imageId: randomImage.id, topText: this._getRndText(10), bottomText: this._getRndText(10)})
        }, interval);
        this.setState({loadTestIntervalId})
    };

    onApplyConfig = ({apiHTTP, monitorWS}) => {
        Configs.setConfig({apiHTTP, monitorWS});
        this._loadMemes()
    };

    handleLoadTestStop = () => {
        clearInterval(this.state.loadTestIntervalId);
        this.setState({loadTestIntervalId: null})
    };

    componentDidMount() {
        this._loadMemes()
    }

    render() {
        const {classes} = this.props;
        const {monitorWS} = Configs.getConfig();

        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>Mege</Typography>
                        <Button color="inherit" className={classes.appbarButton}
                                onClick={this.handleAddMemeDialogOpen}>
                            <AddCircleIcon className={classes.leftIcon}/>
                            Add
                        </Button>
                        <Button color="inherit" className={classes.appbarButton}
                                onClick={this.handleApplyConfigDialogOpen}>
                            <SettingsIcon className={classes.leftIcon}/>
                            Apply Config
                        </Button>
                        {!this.state.loadTestIntervalId &&
                        <Button color="inherit" className={classes.appbarButton}
                                onClick={this.handleLoadTestDialogOpen}>
                            <PlayCircleFilledIcon className={classes.leftIcon}/>
                            Load Test
                        </Button>}
                        {this.state.loadTestIntervalId &&
                        <Button color="inherit" className={classes.appbarButton}
                                onClick={this.handleLoadTestStop}>
                            <PauseCircleFilledIcon className={classes.leftIcon}/>
                            Stop
                        </Button>}
                    </Toolbar>
                </AppBar>
                <div className={classes.appbarPlaceholder}/>
                <Grid container className={classes.root}>
                    <Grid item xs={9}>
                        <Grid container className={classes.root} spacing={16} justify="center">
                            {this.state.memes.map(meme => (
                                <Grid key={meme.id} item>
                                    <Meme imageURL={generateDownloadURL(meme.image.name)}
                                          topText={meme.topText}
                                          bottomText={meme.bottomText}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item style={{position: 'fixed', right: 0}}>
                        <Monitor monitorWS={monitorWS}/>
                    </Grid>
                </Grid>
                <LoadTestDialog open={this.state.loadTestDialogOpen}
                                onClose={this.onLoadTestDialogClose}
                                onTest={this.onLoadTest}/>
                <AddMemeDialog open={this.state.addMemeDialogOpen}
                               onClose={this.onAddMemeDialogClose}
                               onAdd={this.onAddMeme}/>
                <ApplyConfigDialog open={this.state.applyConfigDialogOpen}
                                   onClose={this.onApplyConfigDialogClose}
                                   onApplyConfig={this.onApplyConfig}/>
            </div>
        );
    }
}

export default withStyles(styles)(App);
