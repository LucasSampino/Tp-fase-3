//Comisión Lisandro aula 107
//Sapag Nayla Nahir 93541/6  y  Sampino Lucas 93080/8

//link del video: https://youtu.be/uHrKWcwYrig?si=b0qZU9EfLCArqtbx

//---Configuracion de amplitud---------------------------------------------------------------

let AMP_MIN = 0.01; //umbral minimo de sonido que supera el ruido de fondo

//---Microfono-------------------------------------------------------------------------------

let mic;  

//---Amplitud-------------------------------------------------------------------------------

let amp;        //variable para cargar la amplitud
let haySonido = false;

//---imprimir------------------------------------------------------------------------------

let IMPRIMIR = true;


//---Variables circulo-----------------------------------------------------------------------

let MisCirculos = [];
let x,y,r,c,l,limc,col1,col2,col3;


//---Inicio del programa--------------------------------------------------------------------- 


function setup() {                          //ejecución inicial
  createCanvas(windowWidth, windowHeight);  //tamaño de pantalla
  crearCirculos(amp);                          //función de inicialización de circulos

  //----Microfono-----------------------------------------------------------------------------

  mic = new p5.AudioIn(); //comunicacion con entrada de audio
  mic.start();

  //---Motor de Audio(inicio forzado)---------------------------------------------------------

  userStartAudio();
}

//---Inicio del dibujo------------------------------------------------------------------------



function draw() {                           //ejecución reperida

  amp = mic.getLevel();

  background(0);                            //color de fondo
  //for(let i = 0; i < limc; i++){            //for para cantidad de circulos
  // MisCirculos[i].crecer();
  // MisCirculos[i].dibujar();
  //}


  //background(255);

  if(IMPRIMIR){
    printData();
  }

  haySonido = amp > AMP_MIN;
  
  push();
  for(let i = 0; i < limc; i++){            //for para cantidad de circulos
    MisCirculos[i].crecer();
    MisCirculos[i].dibujar();
  } 
  pop();

  if(IMPRIMIR){
    printData();
  }

}


//---Inicio objeto circulo------------------------------------------------------------------

class circulo{
  constructor(x, y, r, c, l, col1, col2, col3){
    this.x = x; //pos x
    this.y = y; //pos y
    this.r = r; //radio
    this.c = c; //crecimiento

    this.col1 = col1;
    this.col2 = col2;
    this.col3 = col3;

    this.limc = random(map(l, 1, 3, 10, 30)); //limite de crecimieno de circulos
  }

  crecer(){   //funcion de crecimiento con click
    if(haySonido && this.r < this.limc){

      this.mayorC = 0.6;  

      if(amp > 0.04){
        this.c += this.mayorC;
      }

      this.r += this.c; // this.r + this.c = this.r;

      if(this.r >= this.limc){
        this.c = 0;
      }
    } else if(mouseIsPressed){
      background(0);
      this.r =  0;
    }
  }

  dibujar(){                            //funcion de dibujo
    push();
    fill(this.col1, this.col2, this.col3);
    stroke(this.col1, this.col2, this.col3);
    ellipse(this.x, this.y, this.r*2, this.r*2);
    pop();
    push();
    fill(this.col2, this.col3, this.col1);
    stroke(this.col2, this.col3, this.col1);
    ellipse(this.x, this.y, this.r*1.5, this.r*1.5);
    pop();
    push();
    fill(this.col3, this.col1, this.col2);
    stroke(this.col3, this.col1, this.col2);
    ellipse(this.x, this.y, this.r, this.r);
    pop();
  }

  
}

//---Funcion que crea los cieculos-----------------------------------------------------------

function crearCirculos(amp){ //función de inicialización de circulos

  limc = 1000;

  for(let i = 0; i < limc; i++){  //inicializacion de circulos con datos
    x = random(windowWidth);  //pos x
    y = random(windowHeight); //pos y
    r = 0;                    //radio
    c = random(0.1,0.3);      //crecimiento

    //if(amp < 0.03 && amp >= AMP_MIN){
    //  c = random(0.1, 0.3);
    //} else if(amp > 0.04){
    //  c = random(0.3, 0.6);
    //}

    l = random(1,3);          //tipo de tamaño
    col1 = random(0,255);     //colores
    col2 = random(0,255);
    col3 = random(0,255);


    MisCirculos[i] = new circulo(x, y, r, c, l,col1,col2,col3); //inicialización de los circulos
  }

}

//---Funcion texto en pantalla---------------------------------------------------------------

function printData(){

  push();
    textSize(16);
    fill(255);
    let texto;

    texto = "amplitud: " + amp;
    text(texto,20,40);

    //fill(255);
    //ellipse(width/2, height-amp * 1000, 30, 30);

  pop();
}



