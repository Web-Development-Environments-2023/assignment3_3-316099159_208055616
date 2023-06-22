<template>
  <div class="container">
    <div class="detailes">
      <h1>Mafrum</h1>
      <ul>
        <li><strong>Whose recipe:</strong> Amit's Grandma.</li>
        <li><strong>Customary preparation:</strong> The Mafrum is commonly prepared during special occasions or
          festive gatherings.</li>
        <li><strong>Components:</strong> Ground meat (such as beef or lamb), potatoes, eggplant, garlic, spices (such as
          cumin and paprika), and tomato sauce.</li>
        <li><strong>Method of preparation:</strong> Mafrum involves stuffing the seasoned ground meat mixture into
          hollowed-out eggplants and potatoes, then layering them in a baking dish. The dish is typically baked in the
          oven
          until the vegetables are tender and the flavors are well blended. It is then served hot as a hearty and
          flavorful
          main course.</li>
      </ul>
      <img src="../assets/mafrum-recipe.jpg" alt="Mafrum Recipe" class="recipe-image">

      <hr class="recipe-separator">

      <h1>Kuba</h1>
      <ul>
        <li><strong>Whose recipe:</strong> Omer's Mom.</li>
        <li><strong>Customary preparation:</strong> Kuba is often prepared in families during religious holidays or
          festive
          gatherings.</li>
        <li><strong>Components:</strong> Bulgur wheat, ground meat (such as beef or lamb), onions, spices (such as
          cinnamon
          and allspice), and a filling made of meat, onions, and herbs.</li>
        <li><strong>Method of preparation:</strong> Kuba involves mixing the bulgur wheat with the ground meat, onions,
          and
          spices to form a dough-like mixture. Small portions of the mixture are shaped into balls or oval shapes, with a
          hollow center created for the filling. The filling, made of cooked meat, onions, and herbs, is placed inside the
          hollowed-out portion, and the Kuba is then fried until golden brown and crispy. It is typically served hot as an
          appetizer or part of a main course.</li>
      </ul>
      <img src="../assets/kuba-recipe.jpg" alt="Kuba Recipe" class="recipe-image">

      <hr class="recipe-separator">

      <h1>Moroccan Fish</h1>
      <ul>
        <li><strong>Whose recipe:</strong> Every mom ever.</li>
        <li><strong>Customary preparation:</strong> Moroccan Fish is often prepared in families for special occasions,
          especially during Moroccan festivals or family gatherings.</li>
        <li><strong>Components:</strong> Fresh fish (such as sole or sea bass), Moroccan spices (such as cumin, paprika,
          and
          turmeric), garlic, onions, preserved lemons, olives, fresh herbs (such as parsley and cilantro), and a flavorful
          tomato-based sauce.</li>
        <li><strong>Method of preparation:</strong> Moroccan Fish involves marinating the fish with a mixture of spices,
          garlic, and lemon juice. The fish is then pan-fried or grilled until cooked through. Meanwhile, a tangy
          tomato-based sauce is prepared, usually with sautéed onions, garlic, and spices, along with the addition of
          preserved lemons and olives for a distinctive Moroccan flavor. The fish is served topped with the sauce and
          garnished with fresh herbs. It is typically enjoyed with couscous or Moroccan bread.</li>
      </ul>
      <img src="../assets/morrocan-fish-recipe.jpg" alt="Moroccan Fish Recipe" class="recipe-image">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detailes {
  border: 2px solid #96ccda;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 20px;
}

.container {
  min-height: 400px;
}

.recipe-image {
  width: 100%;
  height: auto;
  max-height: 500px;
  /* Adjust the maximum height as needed */
  object-fit: cover;
  margin-top: 20px;
  border-radius: 10px;
}

.recipe-separator {
  border-top: 1px solid #ccc;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>