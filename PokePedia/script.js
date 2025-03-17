async function fetchCards(){
    document.getElementById("cards").innerHTML = "";

    const numberOfCards = document.getElementById("numberOfCards").value;
    const pokemonType = document.getElementById("pokemonType").value;

    const allPokemonsData = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType}/`);
    const allPokemonsJson = await allPokemonsData.json();
    const allPokemons = allPokemonsJson.pokemon;

    console.log(allPokemonsJson)

    const usedUrls = new Set();

    document.getElementById("display").innerHTML = ""


    const displayHeadingDiv = document.createElement('div');
    const displayHeading = document.createElement('h1');
    const displayText = document.createElement('h4');
    displayHeading.innerText = `Dislaying ${numberOfCards} pokemons of ${pokemonType} type.`
    displayText.innerText = `Explore the wonders of these ${numberOfCards} ${pokemonType} Pokémon. With their unique skills and characteristics, they are ready to join you on your adventures and help you become the ultimate Pokémon Master.`

    displayHeadingDiv.appendChild(displayHeading)
    displayHeadingDiv.appendChild(displayText)

    document.getElementById("display").appendChild(displayHeadingDiv);


    for(let i=0;i<numberOfCards;i++){

        let pokemonUrl;
        do{
            const id = Math.floor(Math.random()*allPokemons.length);
            pokemonUrl = allPokemons[id].pokemon.url;
        }while(usedUrls.has(pokemonUrl));

        usedUrls.add(pokemonUrl);
        
        const pokemonData = await fetch(pokemonUrl)
        const jsonPokemonData = await pokemonData.json();
        console.log(jsonPokemonData);

        const pokemonName = jsonPokemonData.name;
        const stats = jsonPokemonData.stats;
        const hp = stats.find((statistic)=>statistic.stat.name=="hp").base_stat;
        const attack = stats.find((statistic)=>statistic.stat.name=="attack").base_stat;

        const doubleDamageFrom1 = allPokemonsJson.damage_relations.double_damage_from ? (allPokemonsJson.damage_relations.double_damage_from [0].name ? allPokemonsJson.damage_relations.double_damage_from[0].name : "-") : "-"
        const doubleDamageFrom2 = allPokemonsJson.damage_relations.double_damage_from ? (allPokemonsJson.damage_relations.double_damage_from[1] ? (allPokemonsJson.damage_relations.double_damage_from[1].name  ? allPokemonsJson.damage_relations.double_damage_from[1].name : "-") : allPokemonsJson.damage_relations.half_damage_from[1].name) : "-"
        const doubleDamageTo = allPokemonsJson.damage_relations.double_damage_to ? (allPokemonsJson.damage_relations.double_damage_to[0].name ? allPokemonsJson.damage_relations.double_damage_to[0].name : "-"): "-"

        const imageUrl = jsonPokemonData.sprites.other.dream_world.front_default || jsonPokemonData.sprites.other.home.front_default || jsonPokemonData.sprites.front_default || jsonPokemonData.sprites.other["official-artwork"].front_default || jsonPokemonData.sprites.other["official-artwork"].front_default || "images/pokemon.png";  
    
    
        console.log(hp+" " + attack);
    
        const pokemonDetails = {
            "id":i,
            "pokemonType": pokemonType,
            "name": pokemonName,
            "hp": `HP ${hp}`,
            "attack": `Attack ${attack}`,
            "doubleDamageFrom1": doubleDamageFrom1,
            "doubleDamageFrom2": doubleDamageFrom2,
            "doubleDamageTo": doubleDamageTo,
            "imageUrl": imageUrl
        }

    document.getElementById("cards").appendChild(generateCard(pokemonDetails));
    }
}


function generateCard(pokemonDetails){
    const card = document.createElement('div');
    card.className = "cards";
    card.innerHTML=`<div><img src=${pokemonDetails.imageUrl} alt=""></div>
        <div class="pokemonDetails">
            <div class="name">
                <h3>${pokemonDetails.name}</h3>
            </div>
            <div class="type">
                <span>${pokemonDetails.pokemonType}</span>
            </div>
            <div class="power">
                <span>${pokemonDetails.hp}</span>
                <span>${pokemonDetails.attack}</span>           
            </div>
            <div class="enemies">
                <span><i class="fa-solid fa-link-slash"></i> ${pokemonDetails.doubleDamageFrom1}</span>
                <span><i class="fa-solid fa-link-slash"></i> ${pokemonDetails.doubleDamageFrom2}</span>
                <span><i class="fa-solid fa-shield"></i>${pokemonDetails.doubleDamageTo}</span>
            </div>
        </div>`

    return card;
}