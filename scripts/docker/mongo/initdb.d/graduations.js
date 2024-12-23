db = db.getSiblingDB('local');
db.createCollection('graduations');

db.graduations.insertMany([{
  "curso": "Bacharelado em Ciência e Tecnologia",
  "grade": "2017",
  "credits_total": 190,
  "free_credits_number": 43,
  "limited_credits_number": 57,
  "mandatory_credits_number": 90
},
{
  "curso": "Bacharelado em Ciência e Tecnologia",
  "grade": "2009",
  "credits_total": 190,
  "free_credits_number": 43,
  "limited_credits_number": 57,
  "mandatory_credits_number": 90
},
{
  "curso": "Bacharelado em Ciência e Tecnologia",
  "grade": "2015",
  "credits_total": 190,
  "free_credits_number": 43,
  "limited_credits_number": 57,
  "mandatory_credits_number": 90
},
{
  "curso": "Bacharelado em Ciências e Humanidades",
  "grade": "2017",
  "limited_credits_number": 81,
  "mandatory_credits_number": 71,
  "free_credits_number": 38,
  "credits_total": 190
},
{
  "curso": "Engenharia de Materiais",
  "grade": "2017N",
  "credits_total": 300,
  "free_credits_number": 28,
  "limited_credits_number": 40,
  "mandatory_credits_number": 232
},
{
  "curso": "Licenciatura em Física",
  "grade": "2015N",
  "credits_total": 218,
  "free_credits_number": 30,
  "limited_credits_number": 20,
  "mandatory_credits_number": 168
},
{
  "curso": "Engenharia de Energia",
  "grade": "2017N",
  "credits_total": 300,
  "free_credits_number": 13,
  "limited_credits_number": 25,
  "mandatory_credits_number": 262
},
{
  "curso": "Bacharelado em Ciência da Computação",
  "grade": "2017N",
  "credits_total": 256,
  "free_credits_number": 12,
  "limited_credits_number": 30,
  "mandatory_credits_number": 214
},
{
  "curso": "Engenharia de Instrumentação, Automação e Robótica",
  "grade": "2017N",
  "credits_total": 300,
  "free_credits_number": 23,
  "limited_credits_number": 23,
  "mandatory_credits_number": 254
},
{
  "curso": "Bacharelado em Ciências Biológicas",
  "grade": "2015N",
  "mandatory_credits_number": 216,
  "free_credits_number": 9,
  "limited_credits_number": 36,
  "credits_total": 261
},
{
  "curso": "Bacharelado em Biotecnologia",
  "grade": "2018N",
  "mandatory_credits_number": 183,
  "free_credits_number": 23,
  "limited_credits_number": 28,
  "credits_total": 234
},
{
  "curso": "Engenharia Ambiental e Urbana",
  "grade": "2017N",
  "mandatory_credits_number": 247,
  "free_credits_number": 30,
  "limited_credits_number": 23,
  "credits_total": 300
},
{
  "curso": "Engenharia de Informação",
  "grade": "2017N",
  "credits_total": 300,
  "free_credits_number": 27,
  "limited_credits_number": 28,
  "mandatory_credits_number": 245
},
{
  "curso": "Bacharelado em Ciências e Humanidades",
  "grade": "2015",
  "credits_total": 190,
  "free_credits_number": 38,
  "limited_credits_number": 81,
  "mandatory_credits_number": 71
},
{
  "curso": "Engenharia Biomédica",
  "grade": "2017N",
  "credits_total": 300,
  "free_credits_number": 28,
  "limited_credits_number": 40,
  "mandatory_credits_number": 232
},
{
  "curso": "Engenharia de Gestão",
  "grade": "2017N",
  "credits_total": 300,
  "free_credits_number": 30,
  "limited_credits_number": 30,
  "mandatory_credits_number": 240
},
{
  "curso": "Bacharelado em Neurociência",
  "grade": "2015N",
  "credits_total": 217,
  "free_credits_number": 10,
  "limited_credits_number": 27,
  "mandatory_credits_number": 180
},
{
  "curso": "Bacharelado em Ciência da Computação",
  "grade": "2015N",
  "credits_total": 256,
  "free_credits_number": 12,
  "limited_credits_number": 30,
  "mandatory_credits_number": 214
},
{
  "curso": "Engenharia Aeroespacial",
  "grade": "2017N",
  "credits_total": 300,
  "free_credits_number": 30,
  "limited_credits_number": 26,
  "mandatory_credits_number": 244
},
{
  "curso": "Bacharelado em Políticas Públicas",
  "grade": "2015A",
  "credits_total": 229,
  "free_credits_number": 20,
  "limited_credits_number": 28,
  "mandatory_credits_number": 181
},
{
  "curso": "Bacharelado em Relações Internacionais",
  "grade": "2015A",
  "credits_total": 228,
  "free_credits_number": 16,
  "limited_credits_number": 32,
  "mandatory_credits_number": 180
},
{
  "curso": "Bacharelado em Políticas Públicas",
  "grade": "2010A",
  "credits_total": 228,
  "free_credits_number": 36,
  "limited_credits_number": 16,
  "mandatory_credits_number": 176
},
{
  "curso": "Engenharia Biomédica",
  "grade": "2013N",
  "credits_total": 300,
  "free_credits_number": 30,
  "limited_credits_number": 28,
  "mandatory_credits_number": 242
},
{
  "curso": "Bacharelado em Relações Internacionais",
  "grade": "2012A",
  "credits_total": 227,
  "free_credits_number": 8,
  "limited_credits_number": 32,
  "mandatory_credits_number": 187
},
{
  "curso": "Bacharelado em Relações Internacionais",
  "grade": "2015N",
  "credits_total": 228,
  "free_credits_number": 16,
  "limited_credits_number": 32,
  "mandatory_credits_number": 180
},
{
  "curso": "Bacharelado em Planejamento Territorial",
  "grade": "2017N",
  "credits_total": 221,
  "free_credits_number": 22,
  "limited_credits_number": 28,
  "mandatory_credits_number": 171
},
{
  "curso": "Licenciatura em Matemática",
  "grade": "2018N",
  "credits_total": 218,
  "free_credits_number": 10,
  "limited_credits_number": 36,
  "mandatory_credits_number": 172
},
{
  "curso": "Bacharelado em Políticas Públicas",
  "grade": "2015N",
  "credits_total": 229,
  "free_credits_number": 20,
  "limited_credits_number": 28,
  "mandatory_credits_number": 181
},
{
  "curso": "Bacharelado em Planejamento Territorial",
  "grade": "2010N",
  "free_credits_number": 26,
  "limited_credits_number": 28,
  "mandatory_credits_number": 172,
  "credits_total": 226
},
{
  "curso": "Bacharelado em Ciências Econômicas",
  "grade": "2010A",
  "credits_total": 242,
  "free_credits_number": 11,
  "limited_credits_number": 16,
  "mandatory_credits_number": 215
},
{
  "curso": "Bacharelado em Química",
  "grade": "2015N",
  "credits_total": 225,
  "free_credits_number": 17,
  "limited_credits_number": 0,
  "mandatory_credits_number": 208
},
{
  "curso": "Licenciatura em Física",
  "grade": "2009N",
  "credits_total": 188,
  "free_credits_number": 15,
  "limited_credits_number": 8,
  "mandatory_credits_number": 165
},
{
  "curso": "Engenharia de Energia",
  "grade": "2013N",
  "credits_total": 300,
  "free_credits_number": 30,
  "limited_credits_number": 39,
  "mandatory_credits_number": 231
},
{
  "curso": "Engenharia de Instrumentação, Automação e Robótica",
  "grade": "2013N",
  "credits_total": 300,
  "free_credits_number": 30,
  "limited_credits_number": 23,
  "mandatory_credits_number": 247
},
{
  "curso": "Licenciatura em Ciências Biológicas",
  "grade": "2016N",
  "credits_total": 219,
  "free_credits_number": 7,
  "limited_credits_number": 8,
  "mandatory_credits_number": 204
},
{
  "curso": "Licenciatura em Filosofia",
  "grade": "2016A",
  "credits_total": 219,
  "free_credits_number": 25,
  "limited_credits_number": 20,
  "mandatory_credits_number": 174
},
{
  "curso": "Bacharelado em Ciências e Humanidades",
  "grade": "2011",
  "credits_total": 190,
  "free_credits_number": 38,
  "limited_credits_number": 80,
  "mandatory_credits_number": 72
},
{
  "curso": "Engenharia de Gestão",
  "grade": "2013N",
  "credits_total": 300,
  "free_credits_number": 30,
  "limited_credits_number": 22,
  "mandatory_credits_number": 248
},
{
  "curso": "Bacharelado em Ciências da Computação",
  "grade": "2009N",
  "credits_total": 256,
  "free_credits_number": 12,
  "limited_credits_number": 32,
  "mandatory_credits_number": 212
},
{
  "curso": "Bacharelado em Física",
  "grade": "2015N",
  "credits_total": 203,
  "free_credits_number": 8,
  "limited_credits_number": 20,
  "mandatory_credits_number": 175
},
{
  "curso": "Licenciatura em Química",
  "grade": "2015N",
  "credits_total": 218,
  "free_credits_number": 4,
  "limited_credits_number": 42,
  "mandatory_credits_number": 172
},
{
  "curso": "Engenharia Aeroespacial",
  "grade": "2013N",
  "credits_total": 300,
  "free_credits_number": 30,
  "limited_credits_number": 22,
  "mandatory_credits_number": 248
},
{
  "curso": "Bacharelado em Ciências Econômicas",
  "grade": "2017N",
  "credits_total": 248,
  "free_credits_number": 11,
  "limited_credits_number": 12,
  "mandatory_credits_number": 225
},
{
  "curso": "Licenciatura em Matemática",
  "grade": "2009N",
  "credits_total": 184,
  "free_credits_number": 10,
  "limited_credits_number": 12,
  "mandatory_credits_number": 162
},
{
  "curso": "Bacharelado em Química",
  "grade": "2009N",
  "credits_total": 241,
  "free_credits_number": 10,
  "limited_credits_number": 20,
  "mandatory_credits_number": 186
},
{
  "curso": "Licenciatura em Química",
  "grade": "2009N",
  "credits_total": 184,
  "free_credits_number": 11,
  "limited_credits_number": 12,
  "mandatory_credits_number": 161
},
{
  "curso": "Engenharia de Materiais",
  "grade": "2013N",
  "credits_total": 300,
  "free_credits_number": 30,
  "limited_credits_number": 44,
  "mandatory_credits_number": 226
},
{
  "curso": "Licenciatura em Ciências Biológicas",
  "grade": "2015N",
  "credits_total": 217,
  "free_credits_number": 7,
  "limited_credits_number": 8,
  "mandatory_credits_number": 202
},
{
  "curso": "Engenharia de Informação",
  "grade": "2013N",
  "credits_total": 300,
  "free_credits_number": 30,
  "limited_credits_number": 27,
  "mandatory_credits_number": 243
},
{
  "curso": "Bacharelado em Planejamento Territorial",
  "grade": "2017A",
  "credits_total": 221,
  "free_credits_number": 22,
  "limited_credits_number": 28,
  "mandatory_credits_number": 171
},
{
  "curso": "Engenharia Aeroespacial",
  "grade": "2017A",
  "credits_total": 300,
  "free_credits_number": 30,
  "limited_credits_number": 26,
  "mandatory_credits_number": 244
},
{
  "curso": "Bacharelado em Matemática",
  "grade": "2017N",
  "credits_total": 224,
  "free_credits_number": 8,
  "limited_credits_number": 20,
  "mandatory_credits_number": 196
},
{
  "curso": "Engenharia Ambiental e Urbana",
  "grade": "2013N",
  "credits_total": 300,
  "free_credits_number": 31,
  "limited_credits_number": 30,
  "mandatory_credits_number": 239
},
{
  "curso": "Engenharia de Instrumentação, Automação e Robótica",
  "grade": "2013A",
  "credits_total": 300,
  "free_credits_number": 30,
  "limited_credits_number": 23,
  "mandatory_credits_number": 247
},
{
  "curso": "Bacharelado em Ciências Econômicas",
  "grade": "2010N",
  "credits_total": 242,
  "free_credits_number": 8,
  "limited_credits_number": 12,
  "mandatory_credits_number": 222
},
{
  "curso": "Bacharelado em Ciências Econômicas",
  "grade": "2017A",
  "credits_total": 248,
  "free_credits_number": 11,
  "limited_credits_number": 12,
  "mandatory_credits_number": 225
},
{
  "curso": "Bacharelado em Relações Internacionais",
  "grade": "2012N",
  "credits_total": 227,
  "free_credits_number": 8,
  "limited_credits_number": 32,
  "mandatory_credits_number": 187
},
{
  "curso": "Bacharelado em Neurociência",
  "grade": "2010N",
  "credits_total": 217,
  "free_credits_number": 10,
  "limited_credits_number": 24,
  "mandatory_credits_number": 183
},
{
  "curso": "Bacharelado em Física",
  "grade": "2009N",
  "credits_total": 200,
  "free_credits_number": 17,
  "limited_credits_number": 12,
  "mandatory_credits_number": 171
},
{
  "curso": "Bacharelado em Filosofia",
  "grade": "2010A",
  "limited_credits_number": 36,
  "mandatory_credits_number": 173
},
{
  "curso": "Engenharia de Energia",
  "grade": "2013A",
  "credits_total": 300,
  "free_credits_number": 30,
  "limited_credits_number": 61,
  "mandatory_credits_number": 209
},
{
  "curso": "Licenciatura em Ciências Naturais e Exatas",
  "grade": "2020",
  "limited_credits_number": 77,
  "mandatory_credits_number": 82,
  "credits_total": 218,
  "free_credits_number": 59
},
{
  "curso": "Bacharelado em Ciências da Computação",
  "grade": "2009A",
  "credits_total": 256,
  "free_credits_number": 6,
  "limited_credits_number": 52,
  "mandatory_credits_number": 198
},
{
  "curso": "Licenciatura em Filosofia",
  "grade": "2016N",
  "credits_total": 219,
  "free_credits_number": 25,
  "limited_credits_number": 21,
  "mandatory_credits_number": 173
},
{
  "curso": "Engenharia de Materiais",
  "grade": "2013A",
  "credits_total": 300,
  "free_credits_number": 22,
  "limited_credits_number": 66,
  "mandatory_credits_number": 212
},
{
  "curso": "Bacharelado em Física",
  "grade": "2009A",
  "credits_total": 200,
  "free_credits_number": 14,
  "limited_credits_number": 38,
  "mandatory_credits_number": 148
},
{
  "curso": "Licenciatura em Física",
  "grade": "2009A",
  "credits_total": 184,
  "free_credits_number": 14,
  "limited_credits_number": 30,
  "mandatory_credits_number": 156
},
{
  "curso": "Bacharelado em Filosofia",
  "grade": "2010N",
  "free_credits_number": 20,
  "mandatory_credits_number": 169,
  "credits_total": 228,
  "limited_credits_number": 39
},
{
  "curso": "Licenciatura em Ciências Humanas",
  "grade": "2020",
  "mandatory_credits_number": 91,
  "limited_credits_number": 93,
  "free_credits_number": 38
},
{
  "curso": "Bacharelado em Ciências Biológicas",
  "grade": "2009N",
  "credits_total": 257,
  "free_credits_number": 13,
  "limited_credits_number": 23,
  "mandatory_credits_number": 221
},
{
  "curso": "Bacharelado em Ciências e Humanidades",
  "grade": "2019",
  "credits_total": 180,
  "free_credits_number": 40,
  "limited_credits_number": 68,
  "mandatory_credits_number": 72
},
{
  "curso": "Bacharelado em Ciências e Humanidades",
  "grade": "2019",
  "credits_total": 180,
  "free_credits_number": 40,
  "limited_credits_number": 68,
  "mandatory_credits_number": 72
},
{
  "curso": "Licenciatura em Ciências Naturais e Exatas",
  "grade": "2020N",
  "free_credits_number": 59,
  "mandatory_credits_number": 82,
  "credits_total": 218,
  "limited_credits_number": 77
},
{
  "curso": "Licenciatura em Ciências Humanas",
  "grade": "2020N",
  "free_credits_number": 38,
  "mandatory_credits_number": 91,
  "limited_credits_number": 92,
  "credits_total": 221
},
{
  "curso": "Bacharelado em Filosofia",
  "grade": "BFil 2020 - BCH 2019",
  "free_credits_number": 12,
  "mandatory_credits_number": 156,
  "credits_total": 216,
  "limited_credits_number": 48
},
{
  "curso": "Engenharia de Informação",
  "grade": "2017A",
  "credits_total": 300,
  "free_credits_number": 25,
  "limited_credits_number": 50,
  "mandatory_credits_number": 225
},
{
  "curso": "Bacharelado em Filosofia",
  "grade": "BFIL 2020 - BCH 2019",
  "free_credits_number": 10,
  "mandatory_credits_number": 158,
  "credits_total": 216,
  "limited_credits_number": 48
},
{
  "curso": "Bacharelado em Neurociência",
  "grade": "BNC 2021 - BCT 2009/2015",
  "credits_total": 211,
  "free_credits_number": 10,
  "limited_credits_number": 25,
  "mandatory_credits_number": 176
},
{
  "curso": "Bacharelado em Filosofia",
  "grade": "BFIL 2020 - BCH 2015",
  "credits_total": 226,
  "free_credits_number": 20,
  "limited_credits_number": 52,
  "mandatory_credits_number": 154
},
{
  "curso": "Bacharelado em Planejamento Territorial",
  "grade": "2010A",
  "credits_total": 226,
  "free_credits_number": 26,
  "limited_credits_number": 28,
  "mandatory_credits_number": 172
},
{
  "curso": "Licenciatura em Ciêcias Naturais e Exatas",
  "grade": "2022",
  "mandatory_credits_number": 82
},
{
  "curso": "Bacharelado em Ciências Econômicas",
  "grade": "BCE 2021 - BCH 2015",
  "credits_total": 254,
  "free_credits_number": 21,
  "limited_credits_number": 28,
  "mandatory_credits_number": 205
},
{
  "curso": "Licenciatura em Ciências Naturais e Exatas",
  "grade": "2022",
  "mandatory_credits_number": 82
},
{
  "curso": "Bacharelado em Ciência e Tecnologia",
  "grade": "2022",
  "credits_total": 176,
  "free_credits_number": 59,
  "limited_credits_number": 32,
  "mandatory_credits_number": 85
},
{
  "curso": "Licenciatura em Ciências Humanas",
  "grade": "2022",
  "mandatory_credits_number": 91,
  "free_credits_number": 38
},
{
  "curso": "Bacharelado em Ciências Econômicas",
  "grade": "BCE 2021 - BCH 2011",
  "credits_total": 254,
  "free_credits_number": 24,
  "limited_credits_number": 29,
  "mandatory_credits_number": 201
},
{
  "curso": "Bacharelado em Ciências e Humanidades",
  "grade": "2022",
  "limited_credits_number": 64,
  "mandatory_credits_number": 72,
  "credits_total": 176,
  "free_credits_number": 40
},
{
  "curso": "Bacharelado em Ciências Econômicas",
  "grade": "BCE 2022 - BCH 2015",
  "credits_total": 250,
  "free_credits_number": 22,
  "limited_credits_number": 24,
  "mandatory_credits_number": 204
},
{
  "curso": "Bacharelado em Ciências Econômicas",
  "grade": "BCE 2022 - BCH 2011",
  "credits_total": 250,
  "free_credits_number": 24,
  "limited_credits_number": 25,
  "mandatory_credits_number": 201
},
{
  "curso": "Bacharelado em Filosofia",
  "grade": "BFIL 2022 - BCH 2022",
  "free_credits_number": 9,
  "mandatory_credits_number": 159,
  "credits_total": 212,
  "limited_credits_number": 44
},
{
  "curso": "Licenciatura em Filosofia",
  "grade": "2011A",
  "credits_total": 230,
  "free_credits_number": 8,
  "limited_credits_number": 20,
  "mandatory_credits_number": 202
},
{
  "curso": "Bacharelado em Filosofia",
  "grade": "BFIL 2022 - BCH 2015",
  "credits_total": 222,
  "free_credits_number": 20,
  "limited_credits_number": 48,
  "mandatory_credits_number": 154
},
{
  "curso": "Bacharelado em Ciência e Tecnologia",
  "grade": "/ficha_individual/95855/ficha.json"
}])
