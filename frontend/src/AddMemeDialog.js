/**
 * Lib imports
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/**
 * Project imports
 */
import Configs from './configs'
import Meme from './Meme'
import {generateDownloadURL} from './utils'

export default class AddMemeDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            chosenImage: {},
            topText: '',
            bottomText: ''
        }
    }

    onExistingImageSelected = (image) => {
        this.setState({chosenImage: image})
    };

    onImageUpload = () => {
        const data = new FormData();
        const file = this.uploadInput.files[0];
        data.append('image', file, file.name);

        const {apiHTTP} = Configs.getConfig();
        fetch(`${apiHTTP}/images`, {
            method: 'POST',
            body: data
        }).then(response => response.json())
            .then(this._loadImages)
    };

    _loadImages = () => {
        const {apiHTTP} = Configs.getConfig();
        fetch(`${apiHTTP}/images`)
            .then(response => response.json())
            .then(images => this.setState({images}));
    };

    onMemeAdd = () => {
        this.props.onAdd({
            imageId: this.state.chosenImage.id,
            topText: this.state.topText,
            bottomText: this.state.bottomText
        })
    };

    onTopTextChange = (event) => {
        this.setState({topText: event.target.value});
    };

    onBottomTextChange = (event) => {
        this.setState({bottomText: event.target.value});
    };

    componentDidMount() {
        this._loadImages()
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Meme</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{marginBottom: 5}}>
                        A meme consists of 2 components: an image and texts at top & bottom
                    </DialogContentText>
                    {
                        this.state.images.length > 0 &&
                        <DialogContentText style={{marginBottom: 5}}>
                            Existing Images:
                        </DialogContentText>
                    }
                    <div>
                        {
                            this.state.images.map(image =>
                                (<img alt="existing"
                                      key={image.name}
                                      src={generateDownloadURL(image.name)}
                                      style={{maxHeight: 100, maxWidth: 50, cursor: 'pointer'}}
                                      onClick={() => this.onExistingImageSelected(image)}/>))
                        }
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginBottom: 10}}>
                        <input
                            accept="image/*"
                            id="flat-button-file"
                            type="file"
                            style={{display: 'none'}}
                            ref={(ref) => {
                                this.uploadInput = ref;
                            }}
                            onChange={this.onImageUpload}
                        />
                        <label htmlFor="flat-button-file">
                            <Button
                                color="primary"
                                component="span">
                                Upload Image
                            </Button>
                        </label>
                    </div>
                    <Meme imageURL={generateDownloadURL(this.state.chosenImage.name)}
                          topText={this.state.topText}
                          bottomText={this.state.bottomText}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="topText"
                        label="Top"
                        type="text"
                        fullWidth
                        onChange={this.onTopTextChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="bottomText"
                        label="Bottom"
                        type="text"
                        fullWidth
                        onChange={this.onBottomTextChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.onMemeAdd} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
