import * as THREE from '../build/three.module.js';
import { GLTFLoader } from '../jsm/loaders/GLTFLoader.js';


// function getHeatMapColor( values ) {
//     /**
//      * get heat map color
//      */

//     // 0. normalize values
//     const normalized_values = normalizeValues( values );
//     const no_values = normalized_values.length;

//     // 1. define gradient color
//     const no_colors = 5;
//     let grad_colors = [
// 	[ 0, 0, 1 ],  // 1. blue
// 	[ 0, 1, 1 ],  // 2. cyan
// 	[ 0, 1, 0 ],  // 3. green
// 	[ 1, 1, 0 ],  // 4. yellow
// 	[ 1, 0, 0 ]   // 5. red
//     ];

//     // 2. get colors
//     var colors = [];
//     var idx1, idx2, fractBetween, value;
//     var red, green, blue;

//     for ( let i = 0; i < no_values; i++ ) {
// 	value = normalized_values[ i ];
// 	fractBetween = 0;

// 	if ( value <= 0 ) {
// 	    idx1 = idx2 = 0;
// 	} else if ( value >= 1 ) {
// 	    idx1 = idx2 = no_colors - 1;
// 	} else {
// 	    value = value * ( no_colors - 1 );
// 	    idx1 = Math.floor( value );
// 	    idx2 = idx1 + 1;
// 	    fractBetween = value - idx1;	    
// 	}

// 	red   = ( grad_colors[ idx2 ][ 0 ] - grad_colors[ idx1 ][ 0 ] ) * fractBetween + grad_colors[ idx1 ][ 0 ];
// 	green = ( grad_colors[ idx2 ][ 1 ] - grad_colors[ idx1 ][ 1 ] ) * fractBetween + grad_colors[ idx1 ][ 1 ];
// 	blue  = ( grad_colors[ idx2 ][ 2 ] - grad_colors[ idx1 ][ 2 ] ) * fractBetween + grad_colors[ idx1 ][ 2 ];
// 	colors.push( red, green, blue );
//     }
//     alert( 'holi' );
//     return colors;
// }

// function normalizeValues( values ) {
//     /**
//      * normalize values to 0-1
//      * @param {[array]} values [values to normalize]
//      * @param {[array]}        [normalized values]
//      */

//     const no_values    = values.length;
//     const min_value    = Math.min( ...values );
//     const max_value    = Math.max( ...values );
//     const diff_min_max = max_value - min_value;

//     for ( let i = 0; i < no_values; i++ ) {
// 	values[ i ] = ( values[ i ] - min_value ) / ( diff_min_max );
//     }

//     return values;
// }


function createCustomTetrahedron( coords, color_values ) {
    /**
     * create a custom tetrahedron geometry as values as vertices colors
     * @param {[array]} coords [vertices' coordinates]
     * @param {[array]} values [vertices' values]
     */

    // 1. positions
    const positions = [ ].concat(
	coords[0], coords[1], coords[2],
	coords[1], coords[0], coords[3],
	coords[2], coords[3], coords[0],
	coords[3], coords[2], coords[1]
    );

    // 2. colors
    const colors = [ ].concat(
	color_values[0], color_values[1], color_values[2],
	color_values[1], color_values[0], color_values[3],
	color_values[2], color_values[3], color_values[0],
	color_values[3], color_values[2], color_values[1]	
    );

    // 3. geometry
    const geometry = new THREE.BufferGeometry( );
    geometry.setAttribute(
	'position',
	new THREE.BufferAttribute( new Float32Array( positions ), 3 )
    );

    // 3.1 colors
    geometry.setAttribute(
	'color',
	new THREE.BufferAttribute( new Float32Array( colors ), 3 )
    );
    // 4. material
    const material = new THREE.MeshBasicMaterial( { transparent: true, opacity: 0.25 } );
    material.vertexColors = true;

    // 4. mesh
    const mesh = new THREE.Mesh( geometry, material );
    // mesh.position.setZ( -0.3 );
    // mesh.scale.set( 0.01, 0.01, 0.01 );

    return mesh;
}

async function loadJSON( filepath ) {
    /**
     * load JSON file
     * @param  {[string]} filepath [filpath string]
     * @return {[object]}          [file content]
     */

    // load json
    var response = await fetch( filepath ); //  + "?nocache=" + new Date().getTime()

    if ( response.ok ) {
	return await response.json();
    } else {
	if ( response.status == '404' ) {
	    throw new Error( 'File not found' );
	} else {
	    throw new Error( response.statusText );
	}
    }
}

async function main( scene ) {
    /**
     * 1. load mesh
     * 2. recreate the mesh
     * 2.1 add custom tetrahedron to the scene
    */

    const gltfLoader = new GLTFLoader().setPath( 'data' );
    gltfLoader.load( 'test_bones.glb', function ( gltf ) {
	scene.add( gltf.scene );
    } );
    // 	;

    alert( 'holi2' );
    // // 1. load mesh
    // var mesh_coords  = await loadJSON( './data/mesh_coord.json' );
    // var mesh_top     = await loadJSON( './data/mesh_top.json' );
    // var color_values = await loadJSON( './data/color_values.json' );

    // // 1.1 array lengths
    // var no_coords = mesh_coords.length;
    // var no_elems  = mesh_top.length;
    // var no_values = color_values.length;

    // // 1.2 elemNodes, elemCoords, no_elemNodes
    // var elemNodes, elemCoords, elemColorValues;
    // var no_elemNodes;

    // // 3. recreate the mesh
    // for ( let i = 0; i < no_elems; i++ ) {
    // 	elemNodes = mesh_top[ i ];
    // 	no_elemNodes = elemNodes.length;

    // 	elemCoords = [];
    // 	elemColorValues = [];
    // 	for ( var j = 0; j < no_elemNodes; j++ ) {
    // 	    elemCoords.push( mesh_coords[ elemNodes[ j ] ] );
    // 	    elemColorValues.push( color_values[ elemNodes[ j ] ] );
    // 	}
    // 	// 3.1 add custom tetrahedron to scene
    // 	scene.add( createCustomTetrahedron( elemCoords, elemColorValues ) );
    // }
}

export { main };
