/*
Nosso dataset de filmes tem muitos documentos diferentes, alguns com títulos
"mais complexos" do que outros. Se quisermos analisar nossa coleção para
encontrar títulos de filmes que têm uma só palavra no título, poderíamos buscar
todos os filmes do dataset e processar isso na aplicação, mas o Aggregation
Framework nos permite fazer isso diretamente no lado do banco de dados.

Crie uma pipeline que retorna documentos com o novo campo title_split, ela deve
seguir as seguintes condições:
1)title_split deve conter uma lista de palavras presentes em title.
2)A pipeline deve retornar apenas filmes com o título composto apenas de uma palavra.
3)A pipeline deve ser ordenada por title em ordem alfabética.
Por exemplo, "Cinderela" e "3-25" devem entrar nessa contagem, mas "Cast Away" não.

Dica: utilize os operadores $split, $size e $sort para te auxiliar.

Sua query deve retornar 8068 documentos.
*/

db.movies.aggregate([
  // para separar as palavras: { $split: [ <string expression>, <delimiter> ] }
  // para agregar o título (array) a um campo chamado title_split
  // {$addFields: {<campo>: <valor>}}
  { $addFields: { title_split: { $split: ["$title", " "] } } },
  // tem que achar elementos em title_split cujo $size (length do array) seja 1
  { $match: { title_split: { $size: 1 } } },
  { $sort: { title_split: 1 } },
]);
