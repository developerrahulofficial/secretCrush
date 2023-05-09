
 let canvas = document.getElementById('stage');
  
  document.getElementById("name").addEventListener("keyup", function() {
    // Code to run when a key is releas
  var value= document.getElementById('name').value;
  // console.log(value);
  
  value=value.toLowerCase();

  if(value=="jisoo"){
    console.log("User entered Jisooo");
    const myImage = document.getElementById("myImage");
    const imageUrl = `images/jisoo.jpeg`;
    const hoverUrl = "images/love.jpg";
    myImage.setAttribute("src", imageUrl);
    myImage.setAttribute("data-hover", hoverUrl);
    new Scene();
    canvas.style.display="";
  }

  if(value=="lisa"){

    console.log("User entered Lisa");
    const myImage = document.getElementById("myImage");
    const imageUrl = `images/lisa.jpg`;
    const hoverUrl = "images/love.jpg";
    myImage.setAttribute("src", imageUrl);
    myImage.setAttribute("data-hover", hoverUrl);
    new Scene();
    canvas.style.display="";


  }

  if(value=="jennie"){
    console.log("User entered Jennie");
    const myImage = document.getElementById("myImage");
    const imageUrl = `images/jennie.png`;
    const hoverUrl = "images/love.jpg";
    myImage.setAttribute("src", imageUrl);
    myImage.setAttribute("data-hover", hoverUrl);
    new Scene();
    canvas.style.display="";
  }

  if(value=="rose"){
    console.log("User entered Rose");
    const myImage = document.getElementById("myImage");
    const imageUrl = `images/rose.jpeg`;
    const hoverUrl = "images/love.jpg";
    myImage.setAttribute("src", imageUrl);
    myImage.setAttribute("data-hover", hoverUrl);
    new Scene();
    canvas.style.display="";
  }

  if(value=="dua"){
    console.log("User entered dua");
    canvas.style.display="";
  }

  if(value=="selena"){
    console.log("User entered selena");
  }

});
const perspective = 800



const vertexShader = `varying vec2 v_uv;

void main() {
	v_uv = uv;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

const fragmentShader = `
  uniform vec2 u_mouse;
uniform vec2 u_res;

uniform sampler2D u_image;
uniform sampler2D u_imagehover;

uniform float u_time;

varying vec2 v_uv;

float circle(in vec2 _st, in float _radius, in float blurriness){
    vec2 dist = _st;
    return 1.-smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*4.0);
}

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise3(vec3 v)
  {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
  }

void main() {
	// We manage the device ratio by passing PR constant
	vec2 res = u_res * PR;
	vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
	// tip: use the following formula to keep the good ratio of your coordinates
	st.y *= u_res.y / u_res.x;

	// We readjust the mouse coordinates
	vec2 mouse = u_mouse * -0.5;
	
	vec2 circlePos = st + mouse;
	float c = circle(circlePos, 0.15, 2.) * 2.5;

	float offx = v_uv.x + sin(v_uv.y + u_time * .1);
	float offy = v_uv.y - u_time * 0.1 - cos(u_time * .001) * .01;

	float n = snoise3(vec3(offx, offy, u_time * .1) * 8.) - 1.;

	float finalMask = smoothstep(0.4, 0.5, n + pow(c, 2.));

	vec4 image = texture2D(u_image, v_uv);
	vec4 hover = texture2D(u_imagehover, v_uv);

	vec4 finalImage = mix(image, hover, finalMask);

	gl_FragColor = finalImage;
}
`

class Scene {
  constructor() {
    this.container = document.getElementById('stage')
        
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.container,
      alpha: true, 
    })
    
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    
    this.initLights()
    this.initCamera()
    
    this.figure = new Figure(this.scene, () => {
      this.update()
    })
    
  }
  
  initLights() {
    const ambientlight = new THREE.AmbientLight(0xffffff, 2)
    this.scene.add(ambientlight)
  }
  
  
  initCamera() {
    const fov = (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI

    this.camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 1000)
    this.camera.position.set(0, 0, perspective)
  }
  
  update() {
     requestAnimationFrame(this.update.bind(this))
    
     this.figure.update()
    
     this.renderer.render(this.scene, this.camera)
  }
}



class Figure {
	constructor(scene, cb) {
		this.$image = document.querySelector('.tile__image')
		this.scene = scene
    this.callback = cb

		this.loader = new THREE.TextureLoader()

		this.image = this.loader.load(this.$image.src, () => {
      this.start()
    })
    
		this.hoverImage = this.loader.load(this.$image.dataset.hover)
    this.$image.style.opacity = 0
		this.sizes = new THREE.Vector2(0, 0)
		this.offset = new THREE.Vector2(0, 0)

    this.mouse = new THREE.Vector2(0, 0)
    window.addEventListener('mousemove', (ev) => { this.onMouseMove(ev) })
	}
  
  start(){
		this.getSizes()
		this.createMesh()
    this.callback()
 }
  
  getSizes() {
		const { width, height, top, left } = this.$image.getBoundingClientRect()
    
    this.sizes.set(width, height);
    
		this.offset.set(left - window.innerWidth / 2 + width / 2, 
                    -top + window.innerHeight / 2 - height / 2)
	}

  
  	createMesh() {
       this.uniforms = {
          u_image: { type: 't', value: this.image },
          u_imagehover: { type: 't', value: this.hoverImage },
          u_mouse: { value: this.mouse },
          u_time: { value: 0 },
          u_res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
     }

      this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
      this.material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        defines: {
             PR: window.devicePixelRatio.toFixed(1)
        }
      })

      this.mesh = new THREE.Mesh(this.geometry, this.material)

      this.mesh.position.set(this.offset.x, this.offset.y, 0)
      this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)

      this.scene.add(this.mesh)
	}
  
    onMouseMove(event) {
    TweenMax.to(this.mouse, 0.4, {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    }) 

    TweenMax.to(this.mesh.rotation, 0.5, {
      x: -this.mouse.y * 0.3,
      y: this.mouse.x * (Math.PI / 6)
    })
  }

  update() {
    this.uniforms.u_time.value += 0.01
  }
  
}


