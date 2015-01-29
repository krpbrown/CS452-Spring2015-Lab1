// Kristian Brown 1/24/15 Lab 1
var gl;
var points;

var vPosition, vPosition2, vPosition3;
var bufferId, bufferId2, bufferId3;
var program;
var clickCounter=1;
var count=1;
var vertices = new Float32Array([-1, -1, 0, 1, 1, -1]);				//triangle
var vertices2 = new Float32Array([-1, 1, 1, 1, 1, -1, -1, -1]);		//square
var vertices3 = new Float32Array([-1, 1, 1, 1, 0.5, 0, -0.5, 0]);	//trapezoid

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    // Associate our shader variables with our data buffer
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );

    
    bufferId2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.bufferData( gl.ARRAY_BUFFER,vertices2, gl.STATIC_DRAW );

    bufferId3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId3 );
    gl.bufferData( gl.ARRAY_BUFFER,vertices3, gl.STATIC_DRAW );        
	
    render();
	canvas.onmousedown = function(clickCounter) {
		clicked(count);
		count = count+1;
	};
};


function render() {
	gl.clear( gl.COLOR_BUFFER_BIT );
	//triangle initial
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
}

function clicked(clickCounter) {

	if(clickCounter % 3 == 0) {
		//triangle
		gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
  		vPosition = gl.getAttribLocation( program, "vPosition" );
    		gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    		gl.enableVertexAttribArray( vPosition );
    		gl.drawArrays( gl.TRIANGLES, 0, 3 );
	}
	if(clickCounter % 3 == 1) {  
		//square  
    		gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    		vPosition2 = gl.getAttribLocation( program, "vPosition" );
    		gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    		gl.enableVertexAttribArray( vPosition2 );
    		gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	}
	if(clickCounter % 3  == 2) {
		//trapezoid
		gl.bindBuffer( gl.ARRAY_BUFFER, bufferId3 );
    		vPosition2 = gl.getAttribLocation( program, "vPosition" );
    		gl.vertexAttribPointer( vPosition3, 2, gl.FLOAT, false, 0, 0 );
    		gl.enableVertexAttribArray( vPosition3 );
    		gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	}

	clickCounter = clickCounter + 1;	
}
