import React from 'react';

const styles = {
    imageWrapper: {
        width: '100%',
        maxHeight: 715,
        maxWidth: 550,
        display: 'block',
        margin: '0 auto',
        position: 'relative',
        lineHeight: 0,
        textAlign: 'center'
    },
    canvas: {
        display: 'block',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, 0)',
        top: 0,
    },
};

export default class Meme extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (this.topTextCanvasContext) {
            if (nextProps.topText) {
                this.drawText(this.topTextCanvasContext, {
                    text: nextProps.topText,
                    x: 10,
                    y: 30,
                    maxWidth: this.topTextCanvasContext.canvas.width
                })
            } else {
                this.clearText(this.topTextCanvasContext);
            }
        }

        if (this.bottomTextCanvasContext) {
            if (nextProps.bottomText) {
                this.drawText(this.bottomTextCanvasContext, {
                    text: nextProps.bottomText,
                    x: 10,
                    y: this.bottomTextCanvasContext.canvas.height - 10,
                    maxWidth: this.bottomTextCanvasContext.canvas.width
                })
            } else {
                this.clearText(this.bottomTextCanvasContext);
            }
        }
    }

    drawText(canvasContext, {text, x, y, maxWidth}) {
        canvasContext.font = '30px Arial';
        canvasContext.fillStyle = '#fff';
        canvasContext.fillText(text, x, y, maxWidth);
    }

    clearText(canvasContext) {
        canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height)
    }

    onImageLoad = () => {
        this.topTextCanvasContext = this.topTextCanvasRef.getContext('2d');
        this.topTextCanvasContext.canvas.width = this.imageRef.width;
        this.topTextCanvasContext.canvas.height = this.imageRef.height;
        this.props.topText && this.drawText(this.topTextCanvasContext, {
            text: this.props.topText,
            x: 10,
            y: 30,
            maxWidth: this.imageRef.width
        });

        this.bottomTextCanvasContext = this.bottomTextCanvasRef.getContext('2d');
        this.bottomTextCanvasContext.canvas.width = this.imageRef.width;
        this.bottomTextCanvasContext.canvas.height = this.imageRef.height;
        this.props.bottomText && this.drawText(this.bottomTextCanvasContext, {
            text: this.props.bottomText,
            x: 10,
            y: this.bottomTextCanvasContext.canvas.height - 10,
            maxWidth: this.imageRef.width
        })
    };

    render() {
        return (
            <div style={styles.imageWrapper}>
                <canvas
                    ref={ref => this.topTextCanvasRef = ref}
                    style={styles.canvas}/>
                <canvas
                    ref={ref => this.bottomTextCanvasRef = ref}
                    style={styles.canvas}/>
                <img alt="chosen by user"
                     ref={ref => this.imageRef = ref}
                     src={this.props.imageURL}
                     style={{
                         maxHeight: 715,
                         maxWidth: 550,
                     }}
                     onLoad={this.onImageLoad}/>
            </div>
        )
    }
}
