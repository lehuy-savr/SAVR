// ══ CONFIG ══
const SPOONACULAR_KEY = '6000b9892bb541d39edcdf8fb25ab3b9';
const SPOON = 'https://api.spoonacular.com';

// ══ FRIDGE (urgency: 0=today, 1=2-3d, 2=4-7d, 3=safe) ══
const FRIDGE_ITEMS = [
  {name:'egg',       label:'Eggs',        urgency:0},
  {name:'tortilla',  label:'Tortilla',    urgency:0},
  {name:'onion',     label:'Onion',       urgency:0},
  {name:'parsley',   label:'Parsley',     urgency:1},
  {name:'bread',     label:'Bread',       urgency:1},
  {name:'cucumber',  label:'Cucumber',    urgency:1},
  {name:'spinach',   label:'Spinach',     urgency:1},
  {name:'lettuce',   label:'Lettuce',     urgency:2},
  {name:'tomato',    label:'Tomato',      urgency:2},
  {name:'corn',      label:'Corn',        urgency:2},
  {name:'pasta',     label:'Pasta',       urgency:3},
  {name:'garlic',    label:'Garlic',      urgency:3},
  {name:'rosemary',  label:'Rosemary',    urgency:3},
  {name:'beef',      label:'Minced Beef', urgency:3},
];
const FRIDGE = FRIDGE_ITEMS.map(f => f.label);

// ══ FALLBACK RECIPES (social feed + API error fallback) ══
const FALLBACK_RECIPES = [
  { name:'Pasta Carbonara', emoji:'🍝', image:'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&auto=format&fit=crop&q=80', time:'20 min', kcal:'680 kcal', diff:'Easy',
    tip:'💡 Eggs expiring today — perfect time for this!',
    chips:[{t:'Garlic'},{t:'Pasta'},{t:'Egg'},{t:'Parmesan',buy:true}],
    desc:'Rich and creamy Italian classic made with eggs, Parmesan, guanciale and black pepper.',
    ingredients:[{n:'Spaghetti',q:'200g',h:true},{n:'Eggs',q:'3 pcs',h:true},{n:'Garlic',q:'2 cloves',h:true},{n:'Parmesan',q:'80g',h:false},{n:'Guanciale',q:'100g',h:false}],
    steps:['Boil salted water and cook spaghetti until al dente.','Fry guanciale until crispy. Whisk eggs with grated Parmesan.','Remove from heat, add pasta, pour egg mix while tossing quickly.','Season with black pepper and serve immediately.'],
    missedIngredients:[{name:'Parmesan',amount:80,unit:'g'},{name:'Guanciale',amount:100,unit:'g'}],
  },
  { name:'Egg Fried Rice', emoji:'🍳', image:'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&auto=format&fit=crop&q=80', time:'15 min', kcal:'420 kcal', diff:'Easy',
    tip:'💡 Uses Eggs and Corn expiring today!',
    chips:[{t:'Egg'},{t:'Corn'},{t:'Garlic'},{t:'Soy sauce',buy:true}],
    desc:'Quick and satisfying — perfect for using up expiring eggs and vegetables.',
    ingredients:[{n:'Eggs',q:'3 pcs',h:true},{n:'Corn',q:'300g',h:true},{n:'Garlic',q:'2 cloves',h:true},{n:'Soy sauce',q:'2 tbsp',h:false},{n:'Spring onion',q:'2 pcs',h:false}],
    steps:['Cook rice ahead and let cool. Heat oil in a wok.','Fry garlic and corn. Push aside, scramble eggs.','Add rice and soy sauce, toss 3–4 minutes.','Garnish with spring onion and serve hot.'],
    missedIngredients:[{name:'Soy sauce',amount:2,unit:'tbsp'},{name:'Spring onion',amount:2,unit:'pcs'}],
  },
  { name:'Spinach Udon', emoji:'🍜', image:'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&auto=format&fit=crop&q=80', time:'20 min', kcal:'540 kcal', diff:'Easy',
    tip:'💡 Uses Spinach and Parsley expiring in 2–3 days!',
    chips:[{t:'Spinach'},{t:'Garlic'},{t:'Parsley'},{t:'Udon noodles',buy:true}],
    desc:'Japanese comfort food that uses your expiring greens before they go.',
    ingredients:[{n:'Spinach',q:'100g',h:true},{n:'Garlic',q:'3 cloves',h:true},{n:'Parsley',q:'25g',h:true},{n:'Udon noodles',q:'200g',h:false},{n:'Sesame oil',q:'1 tbsp',h:false}],
    steps:['Boil udon noodles per package, drain and set aside.','Sauté garlic in sesame oil, add spinach and parsley.','Toss noodles into pan with soy sauce and mirin.','Serve with sesame seeds and a squeeze of lime.'],
    missedIngredients:[{name:'Udon noodles',amount:200,unit:'g'},{name:'Sesame oil',amount:1,unit:'tbsp'}],
  },
  { name:'Veggie Burrito', emoji:'🌯', image:'https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&auto=format&fit=crop&q=80', time:'25 min', kcal:'490 kcal', diff:'Easy',
    tip:'💡 Uses Tortilla expiring today!',
    chips:[{t:'Tortilla'},{t:'Lettuce'},{t:'Tomato'},{t:'Black beans',buy:true}],
    desc:'Loaded and satisfying — uses your expiring tortillas today.',
    ingredients:[{n:'Tortilla',q:'4 pcs',h:true},{n:'Lettuce',q:'1 pc',h:true},{n:'Tomato',q:'250g',h:true},{n:'Black beans',q:'1 can',h:false},{n:'Sour cream',q:'100g',h:false}],
    steps:['Warm tortillas in a dry pan 30 seconds each side.','Mix beans, lettuce and tomato with seasoning.','Load filling into tortillas and fold tightly.','Serve with sour cream and hot sauce.'],
    missedIngredients:[{name:'Black beans',amount:1,unit:'can'},{name:'Sour cream',amount:100,unit:'g'}],
  },
  { name:'Cucumber Salad', emoji:'🥗', image:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80', time:'10 min', kcal:'180 kcal', diff:'Easy',
    tip:'💡 Uses Cucumber and Parsley before they expire!',
    chips:[{t:'Cucumber'},{t:'Tomato'},{t:'Parsley'},{t:'Feta cheese',buy:true}],
    desc:'Light and fresh — ready in 10 minutes using soon-to-expire ingredients.',
    ingredients:[{n:'Cucumber',q:'2 pcs',h:true},{n:'Tomato',q:'250g',h:true},{n:'Parsley',q:'25g',h:true},{n:'Feta cheese',q:'100g',h:false},{n:'Olive oil',q:'2 tbsp',h:false}],
    steps:['Slice cucumber and halve tomatoes.','Finely chop parsley.','Combine all, drizzle olive oil, crumble feta on top.','Season with salt and pepper and serve fresh.'],
    missedIngredients:[{name:'Feta cheese',amount:100,unit:'g'},{name:'Olive oil',amount:2,unit:'tbsp'}],
  },
  { name:'Shakshuka', emoji:'🍳', image:'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&auto=format&fit=crop&q=80', time:'25 min', kcal:'360 kcal', diff:'Easy',
    tip:'💡 Uses Eggs, Tomato and Onion — all expiring soon!',
    chips:[{t:'Egg'},{t:'Tomato'},{t:'Onion'},{t:'Cumin',buy:true}],
    desc:'Eggs poached in a smoky tomato and pepper sauce — a Middle Eastern classic that comes together in one pan.',
    ingredients:[{n:'Eggs',q:'3 pcs',h:true},{n:'Tomato',q:'250g',h:true},{n:'Onion',q:'1 pc',h:true},{n:'Garlic',q:'2 cloves',h:true},{n:'Cumin',q:'1 tsp',h:false},{n:'Paprika',q:'1 tsp',h:false}],
    steps:['Sauté diced onion and garlic in olive oil until soft.','Add chopped tomatoes, cumin and paprika. Simmer 10 min.','Make wells in the sauce and crack in eggs.','Cover and cook 5–7 min until whites are set. Serve with bread.'],
    missedIngredients:[{name:'Cumin',amount:1,unit:'tsp'},{name:'Paprika',amount:1,unit:'tsp'}],
  },
  { name:'Beef Bolognese', emoji:'🍝', image:'https://images.unsplash.com/photo-1598866594230-a7c73d863a1b?w=400&auto=format&fit=crop&q=80', time:'35 min', kcal:'720 kcal', diff:'Medium',
    tip:'💡 Uses Minced Beef, Tomato and Garlic from your fridge!',
    chips:[{t:'Beef'},{t:'Tomato'},{t:'Garlic'},{t:'Pasta'},{t:'Red wine',buy:true}],
    desc:'A hearty slow-simmered meat sauce over pasta — the ultimate comfort meal.',
    ingredients:[{n:'Minced Beef',q:'300g',h:true},{n:'Pasta',q:'200g',h:true},{n:'Tomato',q:'250g',h:true},{n:'Garlic',q:'3 cloves',h:true},{n:'Onion',q:'1 pc',h:true},{n:'Red wine',q:'100ml',h:false}],
    steps:['Brown minced beef in a pan over high heat. Set aside.','Sauté onion and garlic until golden. Add chopped tomato.','Return beef, pour in wine, simmer 20 min until thick.','Cook pasta, toss with sauce and top with Parmesan.'],
    missedIngredients:[{name:'Red wine',amount:100,unit:'ml'},{name:'Parmesan',amount:50,unit:'g'}],
  },
  { name:'Spanish Omelette', emoji:'🥚', image:'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&auto=format&fit=crop&q=80', time:'20 min', kcal:'310 kcal', diff:'Easy',
    tip:'💡 Uses Eggs and Onion expiring today!',
    chips:[{t:'Egg'},{t:'Onion'},{t:'Garlic'},{t:'Olive oil',buy:true}],
    desc:'Classic Spanish tortilla — thick, golden and satisfying. Great hot or cold.',
    ingredients:[{n:'Eggs',q:'3 pcs',h:true},{n:'Onion',q:'1 pc',h:true},{n:'Garlic',q:'1 clove',h:true},{n:'Potato',q:'2 pcs',h:false},{n:'Olive oil',q:'3 tbsp',h:false}],
    steps:['Slice potatoes thin and fry gently in olive oil until soft.','Beat eggs with salt. Add potato and sliced onion.','Pour into pan, cook 5 min until edges set.','Flip with a plate and cook other side 3 min. Slice and serve.'],
    missedIngredients:[{name:'Potato',amount:2,unit:'pcs'},{name:'Olive oil',amount:3,unit:'tbsp'}],
  },
  { name:'Garlic Rosemary Focaccia', emoji:'🍞', image:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80', time:'30 min', kcal:'390 kcal', diff:'Medium',
    tip:'💡 Uses Bread, Garlic and Rosemary — use the bread before it goes!',
    chips:[{t:'Bread'},{t:'Garlic'},{t:'Rosemary'},{t:'Olive oil',buy:true}],
    desc:'Crispy on the outside, pillowy inside — garlic and rosemary make every bite aromatic.',
    ingredients:[{n:'Bread',q:'4 slices',h:true},{n:'Garlic',q:'4 cloves',h:true},{n:'Rosemary',q:'15g',h:true},{n:'Olive oil',q:'4 tbsp',h:false},{n:'Sea salt',q:'1 tsp',h:false}],
    steps:['Brush bread slices generously with olive oil.','Slice garlic thin and scatter over bread with rosemary sprigs.','Sprinkle with sea salt and bake at 200°C for 12–15 min.','Serve warm as a side or starter.'],
    missedIngredients:[{name:'Olive oil',amount:4,unit:'tbsp'},{name:'Sea salt',amount:1,unit:'tsp'}],
  },
  { name:'Beef Lettuce Wraps', emoji:'🥬', image:'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&auto=format&fit=crop&q=80', time:'20 min', kcal:'340 kcal', diff:'Easy',
    tip:'💡 Uses Minced Beef and Lettuce — both need using up!',
    chips:[{t:'Beef'},{t:'Lettuce'},{t:'Garlic'},{t:'Soy sauce',buy:true}],
    desc:'Light and punchy Asian-style wraps — minced beef in crispy lettuce cups with a savory glaze.',
    ingredients:[{n:'Minced Beef',q:'300g',h:true},{n:'Lettuce',q:'1 head',h:true},{n:'Garlic',q:'2 cloves',h:true},{n:'Corn',q:'100g',h:true},{n:'Soy sauce',q:'2 tbsp',h:false},{n:'Sesame oil',q:'1 tsp',h:false}],
    steps:['Brown minced beef in a hot pan, breaking apart.','Add garlic and corn, stir-fry 2 min.','Splash in soy sauce and sesame oil, toss to coat.','Spoon into lettuce cups and serve immediately.'],
    missedIngredients:[{name:'Soy sauce',amount:2,unit:'tbsp'},{name:'Sesame oil',amount:1,unit:'tsp'}],
  },
  { name:'Creamy Tomato Soup', emoji:'🍲', image:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&auto=format&fit=crop&q=80', time:'25 min', kcal:'260 kcal', diff:'Easy',
    tip:'💡 Uses Tomato, Garlic and Onion — clear them out today!',
    chips:[{t:'Tomato'},{t:'Garlic'},{t:'Onion'},{t:'Cream',buy:true}],
    desc:'Silky smooth and deeply comforting — topped with bread croutons for crunch.',
    ingredients:[{n:'Tomato',q:'250g',h:true},{n:'Garlic',q:'3 cloves',h:true},{n:'Onion',q:'1 pc',h:true},{n:'Bread',q:'2 slices',h:true},{n:'Cream',q:'100ml',h:false}],
    steps:['Roast tomatoes and garlic with olive oil at 200°C for 20 min.','Sauté onion until soft, add roasted tomatoes and blend smooth.','Stir in cream, season to taste, simmer 5 min.','Cube bread, toast in pan, serve soup topped with croutons.'],
    missedIngredients:[{name:'Cream',amount:100,unit:'ml'}],
  },
  { name:'Corn & Spinach Quesadilla', emoji:'🫓', image:'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&auto=format&fit=crop&q=80', time:'15 min', kcal:'430 kcal', diff:'Easy',
    tip:'💡 Uses Tortilla, Corn and Spinach expiring soon!',
    chips:[{t:'Tortilla'},{t:'Corn'},{t:'Spinach'},{t:'Cheese',buy:true}],
    desc:'Crispy, cheesy and loaded with veg — done in under 15 minutes.',
    ingredients:[{n:'Tortilla',q:'2 pcs',h:true},{n:'Corn',q:'100g',h:true},{n:'Spinach',q:'50g',h:true},{n:'Garlic',q:'1 clove',h:true},{n:'Cheddar',q:'80g',h:false}],
    steps:['Wilting spinach in a pan with garlic for 2 min.','Layer tortilla with cheese, corn and spinach.','Top with second tortilla, press down.','Cook each side 3 min until golden and crisp. Slice and serve.'],
    missedIngredients:[{name:'Cheddar',amount:80,unit:'g'}],
  },
  { name:'Pesto Pasta', emoji:'🍃', image:'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400&auto=format&fit=crop&q=80', time:'20 min', kcal:'580 kcal', diff:'Easy',
    tip:'💡 Uses Pasta, Garlic and Parsley before they expire!',
    chips:[{t:'Pasta'},{t:'Garlic'},{t:'Parsley'},{t:'Pine nuts',buy:true}],
    desc:'Vibrant and aromatic — homemade herb pesto tossed through al dente pasta.',
    ingredients:[{n:'Pasta',q:'200g',h:true},{n:'Garlic',q:'2 cloves',h:true},{n:'Parsley',q:'25g',h:true},{n:'Rosemary',q:'5g',h:true},{n:'Pine nuts',q:'30g',h:false},{n:'Parmesan',q:'50g',h:false}],
    steps:['Cook pasta in salted water until al dente.','Blend parsley, garlic, pine nuts and olive oil into pesto.','Stir in grated Parmesan, season with salt and pepper.','Drain pasta, toss with pesto and serve with extra Parmesan.'],
    missedIngredients:[{name:'Pine nuts',amount:30,unit:'g'},{name:'Parmesan',amount:50,unit:'g'}],
  },
  { name:'BLT Sandwich', emoji:'🥪', image:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&auto=format&fit=crop&q=80', time:'10 min', kcal:'450 kcal', diff:'Easy',
    tip:'💡 Uses Bread, Lettuce and Tomato — use bread before it goes!',
    chips:[{t:'Bread'},{t:'Lettuce'},{t:'Tomato'},{t:'Bacon',buy:true}],
    desc:'The ultimate quick lunch — crispy bacon, juicy tomato and fresh lettuce on toasted bread.',
    ingredients:[{n:'Bread',q:'4 slices',h:true},{n:'Lettuce',q:'2 leaves',h:true},{n:'Tomato',q:'1 pc',h:true},{n:'Bacon',q:'4 strips',h:false},{n:'Mayonnaise',q:'2 tbsp',h:false}],
    steps:['Toast bread slices until golden.','Fry bacon until crispy.','Spread mayo on toast, layer lettuce, tomato slices and bacon.','Top with second slice and cut diagonally.'],
    missedIngredients:[{name:'Bacon',amount:4,unit:'strips'},{name:'Mayonnaise',amount:2,unit:'tbsp'}],
  },
  { name:'Minced Beef Tacos', emoji:'🌮', image:'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&auto=format&fit=crop&q=80', time:'20 min', kcal:'550 kcal', diff:'Easy',
    tip:'💡 Uses Minced Beef, Tortilla and Tomato from your fridge!',
    chips:[{t:'Beef'},{t:'Tortilla'},{t:'Tomato'},{t:'Cumin',buy:true}],
    desc:'Quick street-style tacos with seasoned beef, fresh tomato and crunchy lettuce.',
    ingredients:[{n:'Minced Beef',q:'300g',h:true},{n:'Tortilla',q:'4 pcs',h:true},{n:'Tomato',q:'2 pcs',h:true},{n:'Lettuce',q:'3 leaves',h:true},{n:'Cumin',q:'1 tsp',h:false},{n:'Chili powder',q:'½ tsp',h:false}],
    steps:['Brown beef with cumin and chili powder, season well.','Dice tomato and shred lettuce.','Warm tortillas in a dry pan 30 seconds each side.','Fill with beef, tomato and lettuce. Serve with lime wedges.'],
    missedIngredients:[{name:'Cumin',amount:1,unit:'tsp'},{name:'Chili powder',amount:0.5,unit:'tsp'}],
  },
];

// ══ FEED POSTS (social — loaded from Spoonacular, fallback below) ══
const SOCIAL_USERS = [
  {name:'Daniël de Jong', avBg:'linear-gradient(135deg,#ff7340,#ff42ca)', avL:'D', streak:'🔥 12 day streak'},
  {name:'Esmee Vink',     avBg:'linear-gradient(135deg,#3777ff,#ff42ca)', avL:'E', streak:'🔥 8 day streak'},
  {name:'Marco Liu',      avBg:'linear-gradient(135deg,#3777ff,#ffeeb7)', avL:'M', streak:'🔥 5 day streak'},
  {name:'Sofia Reyes',    avBg:'linear-gradient(135deg,#ff7340,#ffeeb7)', avL:'S', streak:'🔥 21 day streak'},
  {name:'Lucas Marten',   avBg:'linear-gradient(135deg,#3777ff,#ff42ca)', avL:'L', streak:'🔥 3 day streak'},
  {name:'Yuki Tanaka',    avBg:'linear-gradient(135deg,#ff42ca,#ff7340)', avL:'Y', streak:'🔥 14 day streak'},
  {name:'Amara Osei',     avBg:'linear-gradient(135deg,#3777ff,#ffeeb7)', avL:'A', streak:'🔥 7 day streak'},
  {name:'Björn Hals',     avBg:'linear-gradient(135deg,#3777ff,#ff42ca)', avL:'B', streak:'🔥 9 day streak'},
];
const MASCOTS = ['🫐','🍑','🥦','🌶️','🍋','🥑','🌿','🍄','🫒','🍓'];

let FEED_POSTS = [
  {id:1, user:'Daniël de Jong',  streak:'🔥 12 day streak', avBg:'linear-gradient(135deg,#ff7340,#ff42ca)', avL:'D', emoji:'🍝', image:null, title:'Pasta Carbonara',        desc:'Eggs expiring? This classic uses them up perfectly — creamy, rich and done in 20 min.', time:'20 min', kcal:'680 Kcal', stars:'★★★★☆', mascot:'🫐', likes:87, comments:14, ri:0,  liked:false, saved:false},
  {id:2, user:'Sofia Reyes',     streak:'🔥 21 day streak', avBg:'linear-gradient(135deg,#ff7340,#ffeeb7)', avL:'S', emoji:'🍳', image:null, title:'Shakshuka',              desc:'One pan, six ingredients, zero waste. Made this with tomatoes and onion before they turned!', time:'25 min', kcal:'360 Kcal', stars:'★★★★½', mascot:'🍑', likes:112, comments:23, ri:5,  liked:false, saved:false},
  {id:3, user:'Esmee Vink',      streak:'🔥 8 day streak',  avBg:'linear-gradient(135deg,#3777ff,#ff42ca)', avL:'E', emoji:'🍝', image:null, title:'Beef Bolognese',         desc:'Rich slow-simmered sauce, only 35 min. Minced beef + pantry pasta = no waste Sunday dinner.', time:'35 min', kcal:'720 Kcal', stars:'★★★★☆', mascot:'🥦', likes:64, comments:9,  ri:6,  liked:false, saved:false},
  {id:4, user:'Yuki Tanaka',     streak:'🔥 14 day streak', avBg:'linear-gradient(135deg,#ff42ca,#ff7340)', avL:'Y', emoji:'🥬', image:null, title:'Beef Lettuce Wraps',    desc:'Light, fresh, 20 minutes. Used up the lettuce and minced beef before they hit the bin!', time:'20 min', kcal:'340 Kcal', stars:'★★★★☆', mascot:'🌶️', likes:53, comments:7,  ri:9,  liked:false, saved:false},
  {id:5, user:'Marco Liu',       streak:'🔥 5 day streak',  avBg:'linear-gradient(135deg,#3777ff,#ffeeb7)', avL:'M', emoji:'🫓', image:null, title:'Corn & Spinach Quesadilla', desc:'15 minutes, zero fuss. Cleared my corn and spinach before the week ended. So good!', time:'15 min', kcal:'430 Kcal', stars:'★★★½☆', mascot:'🫒', likes:39, comments:5,  ri:11, liked:false, saved:false},
  {id:6, user:'Amara Osei',      streak:'🔥 7 day streak',  avBg:'linear-gradient(135deg,#3777ff,#ffeeb7)', avL:'A', emoji:'🍲', image:null, title:'Creamy Tomato Soup',    desc:'Roasted tomatoes blended silky smooth — used the last of my tomatoes and old bread for croutons.', time:'25 min', kcal:'260 Kcal', stars:'★★★★★', mascot:'🍋', likes:76, comments:18, ri:10, liked:false, saved:false},
  {id:7, user:'Lucas Marten',    streak:'🔥 3 day streak',  avBg:'linear-gradient(135deg,#3777ff,#ff42ca)', avL:'L', emoji:'🌮', image:null, title:'Minced Beef Tacos',     desc:'Quick street-style tacos — beef, tomato, lettuce, tortilla. Cleared 4 items in one meal!', time:'20 min', kcal:'550 Kcal', stars:'★★★★☆', mascot:'🥑', likes:45, comments:6,  ri:14, liked:false, saved:false},
  {id:8, user:'Björn Hals',      streak:'🔥 9 day streak',  avBg:'linear-gradient(135deg,#3777ff,#ff42ca)', avL:'B', emoji:'🍃', image:null, title:'Pesto Pasta',           desc:'Blended parsley and rosemary into a vibrant pesto. Both herbs were about to expire — saved!', time:'20 min', kcal:'580 Kcal', stars:'★★★★½', mascot:'🍄', likes:91, comments:21, ri:12, liked:false, saved:false},
];
FEED_POSTS.forEach(p => { if (p.image === null && p.ri != null) p.image = FALLBACK_RECIPES[p.ri]?.image || null; });

// ══ MOOD SYSTEM ══
const MOODS = [
  {id:'hungry',      label:'Hungry',      color:'#D4651E', bg:'#FBE8D8'},
  {id:'tired',       label:'Tired',       color:'#E09010', bg:'#FEF3DC'},
  {id:'comfort',     label:'Comfort',     color:'#D0608A', bg:'#FCEAF0'},
  {id:'chill',       label:'Chill',       color:'#C8A010', bg:'#FEF8D9'},
  {id:'healthy',     label:'Healthy',     color:'#7B4FA6', bg:'#EEE5F8'},
  {id:'adventurous', label:'Adventurous', color:'#3A8C4E', bg:'#E1F2E6'},
];
const SHOPPING_MOODS = [
  {id:'none',  label:'Not feeling like shopping', maxMissed:0,  color:'#C4521A', bg:'#FBE0D0'},
  {id:'short', label:'Short stop',                maxMissed:2,  color:'#3AAB5C', bg:'#E1F2E6'},
  {id:'any',   label:'Have to go anyway',         maxMissed:99, color:'#D0608A', bg:'#FCEAF0'},
];

const MOOD_SVGS = {
  hungry: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Pretzel loops -->
    <circle cx="33" cy="36" r="20" fill="#ff7340"/>
    <circle cx="33" cy="36" r="11" fill="#fef7f7"/>
    <circle cx="67" cy="36" r="20" fill="#ff7340"/>
    <circle cx="67" cy="36" r="11" fill="#fef7f7"/>
    <!-- Bottom knot -->
    <path d="M38 52 Q24 64 24 78 Q24 92 38 94 L50 94 L62 94 Q76 92 76 78 Q76 64 62 52 L50 47 Z" fill="#ff7340"/>
    <ellipse cx="50" cy="53" rx="5" ry="4" fill="#e05a20"/>
    <!-- Eyes -->
    <circle cx="41" cy="76" r="5" fill="white"/>
    <circle cx="42" cy="76" r="3" fill="#40262b"/>
    <path d="M53 74 Q57 71 61 74" stroke="#40262b" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Salt -->
    <rect x="26" y="64" width="5" height="2" rx="1" fill="white" opacity="0.7" transform="rotate(-20 26 64)"/>
    <rect x="66" y="60" width="5" height="2" rx="1" fill="white" opacity="0.7" transform="rotate(15 66 60)"/>
  </svg>`,

  tired: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Stick -->
    <rect x="45" y="74" width="10" height="22" rx="5" fill="#b8865a"/>
    <!-- Popsicle body -->
    <rect x="20" y="12" width="60" height="66" rx="30" fill="#ffeeb7"/>
    <!-- Drip -->
    <path d="M72 60 Q80 72 76 82 Q72 88 67 84 Q62 80 66 70 Q70 60 72 60Z" fill="#ffeeb7"/>
    <!-- Heavy droopy eyelids (left) -->
    <circle cx="37" cy="44" r="9" fill="white"/>
    <circle cx="37" cy="46" r="6" fill="#40262b"/>
    <path d="M28 40 Q37 36 46 40" fill="#ffeeb7"/>
    <!-- Heavy droopy eyelids (right) -->
    <circle cx="63" cy="44" r="9" fill="white"/>
    <circle cx="63" cy="46" r="6" fill="#40262b"/>
    <path d="M54 40 Q63 36 72 40" fill="#ffeeb7"/>
    <!-- Flat tired mouth -->
    <path d="M40 62 Q50 59 60 62" stroke="#40262b" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  comfort: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Wrapper / cup -->
    <path d="M30 57 L36 90 L64 90 L70 57 Z" fill="#ff7340"/>
    <line x1="41" y1="57" x2="37" y2="90" stroke="#cc5520" stroke-width="1.8"/>
    <line x1="50" y1="57" x2="50" y2="90" stroke="#cc5520" stroke-width="1.8"/>
    <line x1="59" y1="57" x2="63" y2="90" stroke="#cc5520" stroke-width="1.8"/>
    <!-- Frosting clouds -->
    <circle cx="35" cy="50" r="16" fill="#ff42ca"/>
    <circle cx="65" cy="50" r="16" fill="#ff42ca"/>
    <circle cx="50" cy="38" r="18" fill="#ff42ca"/>
    <ellipse cx="50" cy="55" rx="22" ry="12" fill="#ff42ca"/>
    <!-- Cherry -->
    <circle cx="50" cy="20" r="7" fill="#ff42ca"/>
    <path d="M50 13 Q56 4 62 8" stroke="#40262b" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <!-- Closed happy eyes -->
    <path d="M38 48 Q42 44 46 48" stroke="#40262b" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M54 48 Q58 44 62 48" stroke="#40262b" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Smile -->
    <path d="M40 56 Q50 63 60 56" stroke="#40262b" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  chill: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Fluffy cloud body -->
    <circle cx="28" cy="55" r="22" fill="#ffeeb7"/>
    <circle cx="72" cy="55" r="22" fill="#ffeeb7"/>
    <circle cx="50" cy="35" r="26" fill="#ffeeb7"/>
    <ellipse cx="50" cy="68" rx="40" ry="24" fill="#ffeeb7"/>
    <!-- Closed peaceful eyes -->
    <path d="M33 52 Q38 47 43 52" stroke="#40262b" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M57 52 Q62 47 67 52" stroke="#40262b" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Calm smile -->
    <path d="M40 66 Q50 74 60 66" stroke="#40262b" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  healthy: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Stem + leaf -->
    <line x1="50" y1="8" x2="50" y2="24" stroke="#2060cc" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 14 Q44 4 56 8 Q64 2 50 14Z" fill="#3777ff"/>
    <!-- Grape cluster (7 grapes) -->
    <circle cx="36" cy="34" r="15" fill="#3777ff"/>
    <circle cx="64" cy="34" r="15" fill="#3777ff"/>
    <circle cx="22" cy="57" r="15" fill="#3777ff"/>
    <circle cx="50" cy="57" r="15" fill="#3777ff"/>
    <circle cx="78" cy="57" r="15" fill="#3777ff"/>
    <circle cx="36" cy="80" r="15" fill="#3777ff"/>
    <circle cx="64" cy="80" r="15" fill="#3777ff"/>
    <!-- Shine on top grapes -->
    <circle cx="30" cy="28" r="5" fill="white" opacity="0.22"/>
    <circle cx="58" cy="28" r="5" fill="white" opacity="0.22"/>
    <!-- Face on front-center grape -->
    <circle cx="45" cy="55" r="5.5" fill="white"/>
    <circle cx="45" cy="55" r="3.5" fill="#40262b"/>
    <circle cx="55" cy="55" r="5.5" fill="white"/>
    <circle cx="55" cy="55" r="3.5" fill="#40262b"/>
    <path d="M44 62 Q50 67 56 62" stroke="#40262b" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`,

  adventurous: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Stem -->
    <rect x="46" y="4" width="8" height="14" rx="4" fill="#2060cc"/>
    <!-- Leaf -->
    <path d="M50 10 Q60 2 64 9 Q58 16 50 10Z" fill="#3777ff"/>
    <!-- Pepper body -->
    <path d="M50 16 C67 16 82 32 80 58 C78 80 65 96 54 94 C43 92 32 74 28 52 C24 30 33 16 50 16Z" fill="#3777ff"/>
    <!-- Sheen stripe -->
    <path d="M38 26 Q34 48 38 70" stroke="#6699ff" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.25"/>
    <!-- One big open eye -->
    <circle cx="60" cy="52" r="10" fill="white"/>
    <circle cx="62" cy="52" r="6.5" fill="#40262b"/>
    <circle cx="63" cy="50" r="2.5" fill="white"/>
    <!-- Winking left eye -->
    <path d="M36 49 Q41 45 46 49" stroke="#40262b" stroke-width="3" stroke-linecap="round"/>
    <!-- Smile -->
    <path d="M38 66 Q50 76 64 68" stroke="#40262b" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`,
};

const SHOPPING_SVGS = {
  none: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Rounded square body -->
    <rect x="12" y="12" width="76" height="76" rx="20" fill="#ff7340"/>
    <!-- Block bar eyes -->
    <rect x="24" y="34" width="20" height="9" rx="3.5" fill="white"/>
    <rect x="56" y="34" width="20" height="9" rx="3.5" fill="white"/>
    <!-- Flat unhappy mouth -->
    <rect x="28" y="60" width="44" height="8" rx="4" fill="white"/>
  </svg>`,

  short: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- 4-leaf clover -->
    <circle cx="50" cy="28" r="24" fill="#3777ff"/>
    <circle cx="50" cy="72" r="24" fill="#3777ff"/>
    <circle cx="28" cy="50" r="24" fill="#3777ff"/>
    <circle cx="72" cy="50" r="24" fill="#3777ff"/>
    <circle cx="50" cy="50" r="16" fill="#3777ff"/>
    <!-- Eyes -->
    <circle cx="43" cy="46" r="6" fill="white"/>
    <circle cx="43" cy="46" r="3.8" fill="#40262b"/>
    <circle cx="57" cy="46" r="6" fill="white"/>
    <circle cx="57" cy="46" r="3.8" fill="#40262b"/>
    <!-- Smile -->
    <path d="M40 56 Q50 64 60 56" stroke="#40262b" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Stem -->
    <rect x="46" y="88" width="8" height="10" rx="4" fill="#2060cc"/>
  </svg>`,

  any: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Pill / oval body -->
    <ellipse cx="50" cy="54" rx="40" ry="30" fill="#ff42ca"/>
    <!-- Closed happy eyes -->
    <path d="M30 48 Q37 43 44 48" stroke="white" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M56 48 Q63 43 70 48" stroke="white" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <!-- Big happy smile -->
    <path d="M33 61 Q50 74 67 61" stroke="white" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  </svg>`,
};

// ══ STATE ══
const STATE = {
  history:['social'],
  mealPlan:[], savedRecipes:[], socialBookmarks:[],
  currentRecipe:null, lastMatched:null,
  tinderQueue:[], tinderIdx:0, tinderLoading:false,
  recipeCache:{},
};

// ══════════════════════════════════════
//  SPOONACULAR HELPERS
// ══════════════════════════════════════

function recipeToEmoji(title='', dishTypes=[]) {
  const t = (title + ' ' + dishTypes.join(' ')).toLowerCase();
  if(/pasta|spaghetti|penne|fettuccine|carbonara|bolognese|linguine/.test(t)) return '🍝';
  if(/pizza/.test(t)) return '🍕';
  if(/burger/.test(t)) return '🍔';
  if(/sandwich|sub|hoagie/.test(t)) return '🥪';
  if(/salad/.test(t)) return '🥗';
  if(/soup|broth|bisque|chowder/.test(t)) return '🍲';
  if(/stew|chili/.test(t)) return '🫕';
  if(/taco/.test(t)) return '🌮';
  if(/burrito|quesadilla|fajita/.test(t)) return '🌯';
  if(/fried rice|rice bowl|risotto/.test(t)) return '🍚';
  if(/\brice\b/.test(t)) return '🍚';
  if(/noodle|ramen|udon|soba|pho/.test(t)) return '🍜';
  if(/curry/.test(t)) return '🍛';
  if(/sushi/.test(t)) return '🍱';
  if(/omelette|frittata|quiche|scramble/.test(t)) return '🍳';
  if(/\begg/.test(t)) return '🍳';
  if(/pancake|waffle/.test(t)) return '🥞';
  if(/chicken|poultry/.test(t)) return '🍗';
  if(/beef|steak|meatball/.test(t)) return '🥩';
  if(/fish|salmon|tuna|cod|tilapia|halibut/.test(t)) return '🐟';
  if(/shrimp|prawn|seafood|lobster/.test(t)) return '🦐';
  if(/cake|brownie|cookie|dessert|chocolate/.test(t)) return '🎂';
  if(/bread|muffin|biscuit/.test(t)) return '🍞';
  if(/stir.?fry/.test(t)) return '🥘';
  if(/wrap/.test(t)) return '🌯';
  return '🍽️';
}

function difficultyFromTime(mins) {
  if (!mins) return 'Easy';
  if (mins <= 20) return 'Easy';
  if (mins <= 45) return 'Medium';
  return 'Hard';
}

function matchFridgeItem(name='') {
  const n = name.toLowerCase();
  return FRIDGE_ITEMS.find(f => n.includes(f.name) || f.name.includes(n));
}

function generateTip(usedIngredients=[]) {
  const urgent = usedIngredients
    .map(u => matchFridgeItem(u.name))
    .filter(f => f && f.urgency <= 1)
    .sort((a,b) => a.urgency - b.urgency);
  if (!urgent.length) return null;
  const names = [...new Set(urgent.map(f => f.label))].slice(0,2).join(' & ');
  return `💡 Uses ${names} — ${urgent[0].urgency === 0 ? 'expiring today' : 'expiring soon'}!`;
}

function generateChips(used=[], missed=[]) {
  return [
    ...used.slice(0,3).map(u => ({t: u.name, buy:false})),
    ...missed.slice(0,2).map(m => ({t: m.name, buy:true})),
  ];
}

function transformRecipe(basic, info) {
  const kcalNutrient = info.nutrition?.nutrients?.find(n => n.name === 'Calories');
  const kcal = kcalNutrient ? `${Math.round(kcalNutrient.amount)} kcal` : '';

  const steps = info.analyzedInstructions?.[0]?.steps?.map(s => s.step)
    || (info.instructions ? [info.instructions] : ['See full recipe for instructions.']);

  const ingredients = (info.extendedIngredients || []).map(ing => ({
    n: ing.name,
    q: `${ing.amount ? ing.amount : ''} ${ing.unit || ''}`.trim(),
    h: !!matchFridgeItem(ing.name),
  }));

  const rawDesc = (info.summary || '').replace(/<[^>]*>/g, '').replace(/\s+/g,' ').trim();
  const desc = rawDesc.split('. ').slice(0,2).join('. ');

  return {
    id: info.id,
    name: info.title,
    image: info.image || null,
    emoji: recipeToEmoji(info.title, info.dishTypes || []),
    time: info.readyInMinutes ? `${info.readyInMinutes} min` : '',
    kcal,
    diff: difficultyFromTime(info.readyInMinutes),
    desc: desc.length > 140 ? desc.slice(0,140)+'…' : desc,
    ingredients,
    steps,
    tip: generateTip(basic.usedIngredients || []),
    chips: generateChips(basic.usedIngredients || [], basic.missedIngredients || []),
    usedCount: basic.usedIngredientCount || 0,
    missedIngredients: basic.missedIngredients || [],
  };
}

async function loadTinderRecipes() {
  if (STATE.tinderLoading) return;
  STATE.tinderLoading = true;
  showTinderLoading(true);

  try {
    const ingredients = FRIDGE_ITEMS.map(f => f.name).join(',');
    const findRes = await fetch(
      `${SPOON}/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=20&ranking=1&ignorePantry=true&apiKey=${SPOONACULAR_KEY}`
    );
    if (!findRes.ok) throw new Error(`findByIngredients ${findRes.status}`);
    const found = await findRes.json();
    if (!Array.isArray(found) || !found.length) throw new Error('Empty response');

    const ids = found.map(r => r.id).join(',');
    const infoRes = await fetch(
      `${SPOON}/recipes/informationBulk?ids=${ids}&includeNutrition=true&apiKey=${SPOONACULAR_KEY}`
    );
    if (!infoRes.ok) throw new Error(`informationBulk ${infoRes.status}`);
    const infos = await infoRes.json();

    const infoMap = {};
    infos.forEach(info => { infoMap[info.id] = info; });

    STATE.tinderQueue = found
      .filter(r => infoMap[r.id])
      .map(r => transformRecipe(r, infoMap[r.id]));

    STATE.tinderQueue.forEach(r => { STATE.recipeCache[r.id] = r; });
    applyMoodFilter();

  } catch (err) {
    console.error('Spoonacular error:', err);
    STATE.tinderQueue = [...FALLBACK_RECIPES];
    toast('Using offline recipes 📦');
  } finally {
    STATE.tinderLoading = false;
    STATE.tinderIdx = 0;
    showTinderLoading(false);
    renderTinderCard();
    renderProfileGrid();
  }
}

function showTinderLoading(on) {
  const card = document.getElementById('tcard');
  const acts = document.querySelector('.t-acts');
  const loading = document.getElementById('tinder-loading');
  if (card) card.style.display = on ? 'none' : '';
  if (acts) acts.style.display = on ? 'none' : '';
  if (loading) loading.style.display = on ? 'flex' : 'none';
}

// ══════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════

function go(id) {
  const cur = document.querySelector('.screen.active');
  if(cur){cur.classList.remove('active');cur.style.transform='translateX(-20px)';setTimeout(()=>cur.style.transform='',280);}
  const next = document.getElementById(id);
  if(!next) return;
  next.style.transform='translateX(20px)';
  next.classList.add('active');
  requestAnimationFrame(()=>next.style.transform='');
  STATE.history.push(id);
  if(id==='recipe-detail') renderRecipeDetail();
  if(id==='saved-recipes') renderSavedRecipes();
  if(id==='tinder')        initTinder();
  if(id==='profile')       renderProfileGrid();
  if(id==='recap')         document.getElementById('recap-meal-count').textContent = STATE.mealPlan.length + STATE.savedRecipes.length;
}

function back() {
  STATE.history.pop();
  const prev = STATE.history[STATE.history.length-1] || 'social';
  const cur = document.querySelector('.screen.active');
  if(cur) cur.classList.remove('active');
  const t = document.getElementById(prev);
  if(t){t.style.transform='translateX(-20px)';t.classList.add('active');requestAnimationFrame(()=>t.style.transform='');}
}

function nav(id) {
  STATE.history = [id];
  document.querySelectorAll('.screen.active').forEach(s=>s.classList.remove('active'));
  const t = document.getElementById(id);
  if(t){t.style.transform='';t.classList.add('active');}
  if(id==='planning'){renderMealPlan();renderGrocery();renderWeeklySchedule();renderCalMeals();}
  if(id==='social')  renderFeed();
  if(id==='profile') renderProfileGrid();
}

// ══════════════════════════════════════
//  TINDER
// ══════════════════════════════════════

function initTinder() {
  if (STATE.tinderQueue.length) { renderTinderCard(); return; }
  loadTinderRecipes();
}

function renderTinderCard() {
  if (!STATE.tinderQueue.length) return;
  if (STATE.tinderIdx >= STATE.tinderQueue.length) {
    STATE.tinderIdx = 0;
    toast('All recipes seen! Restarting 🔄');
  }
  const r = STATE.tinderQueue[STATE.tinderIdx];
  STATE.currentRecipe = r;

  const img = document.getElementById('tc-img');
  const emojiEl = document.getElementById('tc-emoji');
  if (r.image) {
    img.src = r.image;
    img.style.display = 'block';
    emojiEl.style.display = 'none';
  } else {
    img.style.display = 'none';
    emojiEl.style.display = 'flex';
    emojiEl.textContent = r.emoji || '🍽️';
  }

  document.getElementById('tc-name').textContent = r.name;
  document.getElementById('tc-time').textContent = r.time || '? min';

  // Mood badge
  const badge = getMoodBadge();
  const moodEl = document.getElementById('tc-mood');
  if (badge && moodEl) {
    const moodState = getMoodState();
    const svgIcon = moodState && MOOD_SVGS[moodState.emotion]
      ? `<span style="display:inline-block;width:20px;height:20px;flex-shrink:0">${MOOD_SVGS[moodState.emotion]}</span>`
      : '';
    moodEl.style.display = 'flex';
    moodEl.style.background = badge.bg;
    moodEl.style.color = badge.color;
    moodEl.innerHTML = `${svgIcon}<span>${badge.label}</span>`;
  } else if (moodEl) {
    moodEl.style.display = 'none';
  }

  document.getElementById('tc-desc').textContent = [r.desc, r.kcal, r.diff].filter(Boolean).join(' · ');
  document.getElementById('tc-chips').innerHTML = (r.chips||[]).map(c =>
    `<span class="tchip${c.buy?' buy':''}">${c.t}</span>`
  ).join('');

  const card = document.getElementById('tcard');
  card.style.transform = '';
  card.style.opacity = '';
}

function swipe(dir) {
  const card = document.getElementById('tcard');
  const r = STATE.tinderQueue[STATE.tinderIdx];
  if (!r) return;

  if (dir === 'right') {
    card.style.transform = 'translateX(160%) rotate(20deg)'; card.style.opacity = '0';
    if (!STATE.mealPlan.find(m => m.name === r.name))
      STATE.mealPlan.push({name:r.name, emoji:r.emoji, image:r.image||null, meta:`${r.time} · ${r.kcal}`, id:r.id, recipe:r});
    STATE.lastMatched = r;
    setMatchScreen(r);
    renderGrocery(); renderWeeklySchedule();
    setTimeout(() => go('match'), 340);
  } else if (dir === 'left') {
    card.style.transform = 'translateX(-160%) rotate(-20deg)'; card.style.opacity = '0';
    toast(`${r.emoji} Skipped`);
  } else {
    card.style.transform = 'translateY(-80px)'; card.style.opacity = '0';
    if (!STATE.savedRecipes.find(s => s.name === r.name))
      STATE.savedRecipes.push({name:r.name, emoji:r.emoji, image:r.image||null, source:'tinder', meta:`${r.time} · ${r.kcal}`, id:r.id, recipe:r});
    updateSavedBadge();
    toast(`🔖 ${r.name} saved for later`);
  }
  STATE.tinderIdx++;
  setTimeout(renderTinderCard, 360);
}

function setMatchScreen(r) {
  const box = document.getElementById('match-img');
  const img = document.getElementById('match-img-actual');
  if (r.image && img) {
    img.src = r.image;
    img.style.display = 'block';
    box.style.fontSize = '0';
  } else {
    if (img) img.style.display = 'none';
    box.style.fontSize = '72px';
    box.childNodes[0].textContent = r.emoji || '🍽️';
  }
  document.getElementById('match-sub').textContent = `${r.name} added to your meal plan 🎉`;
}

// touch swipe
const _tc = document.getElementById('tcard');
let _tx=0, _ty=0;
_tc.addEventListener('touchstart', e=>{_tx=e.touches[0].clientX;_ty=e.touches[0].clientY;},{passive:true});
_tc.addEventListener('touchend', e=>{
  const dx=e.changedTouches[0].clientX-_tx, dy=e.changedTouches[0].clientY-_ty;
  if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)) swipe(dx>0?'right':'left');
  else if(dy<-60) swipe('skip');
},{passive:true});

// ══════════════════════════════════════
//  SOCIAL FEED (Spoonacular)
// ══════════════════════════════════════

function starsFromScore(score) {
  const n = Math.min(5, Math.max(1, Math.round((score || 70) / 20)));
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function transformRecipeFromRandom(r) {
  const kcalNutrient = r.nutrition?.nutrients?.find(n => n.name === 'Calories');
  return {
    id: r.id, name: r.title, image: r.image || null,
    emoji: recipeToEmoji(r.title, r.dishTypes || []),
    time: r.readyInMinutes ? `${r.readyInMinutes} min` : '',
    kcal: kcalNutrient ? `${Math.round(kcalNutrient.amount)} kcal` : '',
    diff: difficultyFromTime(r.readyInMinutes),
    desc: (r.summary || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 200),
    ingredients: (r.extendedIngredients || []).map(ing => ({
      n: ing.name, q: `${ing.amount || ''} ${ing.unit || ''}`.trim(), h: !!matchFridgeItem(ing.name),
    })),
    steps: r.analyzedInstructions?.[0]?.steps?.map(s => s.step) || ['See full recipe for instructions.'],
    tip: null,
    chips: (r.extendedIngredients || []).slice(0, 5).map(ing => ({t: ing.name, buy: !matchFridgeItem(ing.name)})),
    usedCount: 0, missedIngredients: [],
  };
}

async function loadSocialFeed() {
  try {
    const res = await fetch(
      `${SPOON}/recipes/random?number=10&includeNutrition=true&apiKey=${SPOONACULAR_KEY}`
    );
    if (!res.ok) throw new Error(`random ${res.status}`);
    const { recipes } = await res.json();
    FEED_POSTS = recipes.map((r, i) => {
      const u = SOCIAL_USERS[i % SOCIAL_USERS.length];
      const kcalNutrient = r.nutrition?.nutrients?.find(n => n.name === 'Calories');
      const rawDesc = (r.summary || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      const shortDesc = rawDesc.split('. ')[0];
      const seed = r.id % 100;
      return {
        id: r.id,
        user: u.name, streak: u.streak, avBg: u.avBg, avL: u.avL,
        emoji: recipeToEmoji(r.title, r.dishTypes || []),
        image: r.image || null,
        title: r.title,
        desc: shortDesc.length > 90 ? shortDesc.slice(0, 90) + '…' : shortDesc,
        time: r.readyInMinutes ? `${r.readyInMinutes} min` : '',
        kcal: kcalNutrient ? `${Math.round(kcalNutrient.amount)} Kcal` : '',
        stars: starsFromScore(r.spoonacularScore),
        mascot: MASCOTS[i % MASCOTS.length],
        likes: 5 + (seed * 1.3 | 0),
        comments: 1 + (seed % 18),
        liked: false,
        recipe: transformRecipeFromRandom(r),
      };
    });
    renderFeed();
  } catch (e) {
    console.warn('Social feed fallback:', e.message);
  }
}

function setSocialTab(tab, el) {
  document.querySelectorAll('.stab').forEach(t=>{t.className='stab off';});
  el.className='stab on';
  document.getElementById('sv-explore').style.display  = tab==='explore' ? 'block' : 'none';
  document.getElementById('sv-saved').style.display    = tab==='saved'   ? 'block' : 'none';
  document.getElementById('sv-updates').style.display  = tab==='updates' ? 'block' : 'none';
  if(tab==='saved') renderSocialSaved();
}

function postHTML(p) {
  const bkd = STATE.socialBookmarks.some(b=>b.id===p.id);
  const cnt = p.likes + (p.liked ? 1 : 0);
  return [
    '<div class="post">',
    '<div class="post-meta">',
    `<div class="av" style="background:${p.avBg}">${p.avL}</div>`,
    `<div><div class="post-user">${p.user}</div><div style="font-size:11px;color:var(--m3);font-weight:500">${p.streak}</div></div>`,
    '<div style="margin-left:auto;font-size:18px;color:var(--m3);cursor:pointer;padding:2px 4px">···</div>',
    '</div>',
    '<div class="post-body">',
    `<div class="post-title">${p.title}</div>`,
    `<div class="post-desc">${p.desc}</div>`,
    `<div class="post-stats"><span>${p.time}</span><span>${p.kcal}</span><span class="stars">${p.stars}</span>${p.recipe ? getRecipeMoodChip(p.recipe) : ''}</div>`,
    '</div>',
    `<div class="post-img" data-pid="${p.id}" style="cursor:pointer">${p.image ? `<img src="${p.image}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">` : `<span style="font-size:56px">${p.emoji}</span>`}</div>`,
    '<div class="post-acts">',
    `<button class="pa ${p.liked?'liked':''}" data-pid="${p.id}" data-action="like"><svg width="15" height="15" viewBox="0 0 16 16" fill="${p.liked?'currentColor':'none'}" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13.5S2 9.8 2 5.5a3 3 0 0 1 6-1 3 3 0 0 1 6 1C14 9.8 8 13.5 8 13.5Z"/></svg> <span>${cnt}</span></button>`,
    `<button class="pa"><svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 7A6 6 0 1 1 2 7a6 6 0 0 1 12 0Z"/><path d="M2.5 13.5 2 15l2-1"/></svg> <span>${p.comments}</span></button>`,
    `<button class="pa ${bkd?'bkd':''}" data-pid="${p.id}" data-action="bookmark" style="margin-left:auto"><svg width="15" height="15" viewBox="0 0 16 16" fill="${bkd?'currentColor':'none'}" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2h8a1 1 0 0 1 1 1v10l-5-3-5 3V3a1 1 0 0 1 1-1Z"/></svg> ${bkd?'Saved':'Save'}</button>`,
    `<button class="pa" data-action="share"><svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="3" r="1.5"/><circle cx="12" cy="13" r="1.5"/><circle cx="4" cy="8" r="1.5"/><path d="M5.5 7.1 10.5 4M5.5 8.9l5 3.1"/></svg></button>`,
    '</div></div>',
  ].join('');
}

function renderFeed() {
  document.getElementById('feed-list').innerHTML = FEED_POSTS.map(postHTML).join('');
}

document.addEventListener('click', function(e) {
  // social action buttons
  const btn = e.target.closest('[data-action]');
  if (btn) {
    const act = btn.dataset.action;
    const pid = btn.dataset.pid ? +btn.dataset.pid : null;
    if(act==='like'     && pid!==null) { toggleLike(pid); return; }
    if(act==='download' && pid!==null) { downloadRecipe(pid); return; }
    if(act==='bookmark' && pid!==null) { toggleBookmark(pid); return; }
    if(act==='share')                  { toast('Link copied! 📋'); return; }
    if(act==='view-saved')  { STATE.currentRecipe=findRecipeByName(btn.dataset.bk); go('recipe-detail'); return; }
    if(act==='plan-saved')  { addSavedToPlan(btn.dataset.bk); return; }
    return;
  }
  // post image → recipe detail
  const postImg = e.target.closest('.post-img[data-pid]');
  if(postImg){ const p=FEED_POSTS.find(fp=>fp.id===+postImg.dataset.pid); STATE.currentRecipe=p?.recipe||FALLBACK_RECIPES[0]; go('recipe-detail'); return; }
  const bkImg = e.target.closest('.post-img[data-bk]');
  if(bkImg){ STATE.currentRecipe=findRecipeByName(bkImg.dataset.bk); go('recipe-detail'); return; }
});

function findRecipeByName(name) {
  return STATE.tinderQueue.find(r=>r.name===name)
      || Object.values(STATE.recipeCache).find(r=>r.name===name)
      || FALLBACK_RECIPES.find(r=>r.name===name)
      || FALLBACK_RECIPES[0];
}

function toggleLike(id) {
  const p=FEED_POSTS.find(p=>p.id===id); p.liked=!p.liked; renderFeed();
}

function downloadRecipe(id) {
  const p=FEED_POSTS.find(fp=>fp.id===id);
  const r=p?.recipe || FALLBACK_RECIPES[p?.ri||0];
  if(!STATE.savedRecipes.find(s=>s.name===r.name)) {
    STATE.savedRecipes.push({name:r.name,emoji:r.emoji,source:'social',meta:`${r.time} · ${r.kcal}`,recipe:r});
    updateSavedBadge(); toast('⬇️ '+r.name+' saved to recipes!');
  } else toast('Already in saved recipes');
}

function toggleBookmark(id) {
  const p=FEED_POSTS.find(fp=>fp.id===id);
  const r=p?.recipe || FALLBACK_RECIPES[p?.ri||0];
  const idx=STATE.socialBookmarks.findIndex(b=>b.id===id);
  if(idx>=0) {
    STATE.socialBookmarks.splice(idx,1);
    const sri=STATE.savedRecipes.findIndex(s=>s.name===r.name&&s.source==='social');
    if(sri>=0) STATE.savedRecipes.splice(sri,1);
    toast('Removed from saved'); updateSavedBadge();
  } else {
    STATE.socialBookmarks.push({id,name:r.name,emoji:r.emoji,image:r.image||null,meta:`${r.time} · ${r.kcal}`,recipe:r});
    if(!STATE.savedRecipes.find(s=>s.name===r.name))
      STATE.savedRecipes.push({name:r.name,emoji:r.emoji,source:'social',meta:`${r.time} · ${r.kcal}`,recipe:r});
    toast('🔖 '+r.name+' saved!'); updateSavedBadge();
  }
  renderFeed();
}

function renderSocialSaved() {
  const list=document.getElementById('social-saved-list');
  const empty=document.getElementById('social-saved-empty');
  if(!STATE.socialBookmarks.length){list.innerHTML='';empty.style.display='block';return;}
  empty.style.display='none';
  list.innerHTML=STATE.socialBookmarks.map(b=>`
    <div class="post" style="cursor:pointer">
      <div class="post-body" style="padding:12px 14px 8px">
        <div class="post-title">${b.name}</div>
        <div class="post-stats" style="display:flex;gap:10px;font-size:12px;font-weight:600;color:var(--m3)">${b.meta}</div>
      </div>
      <div class="post-img" data-bk="${b.name}" style="cursor:pointer">${b.image?`<img src="${b.image}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">`:b.emoji}</div>
      <div class="post-acts">
        <button class="pa" data-bk="${b.name}" data-action="view-saved">View Recipe</button>
        <button class="pa" data-bk="${b.name}" data-action="plan-saved" style="margin-left:auto">+ Add to plan</button>
      </div>
    </div>`).join('');
}

function updateSavedBadge() {
  const b=document.getElementById('saved-badge');
  const n=STATE.savedRecipes.length;
  b.style.display=n>0?'block':'none'; b.textContent=n;
  document.getElementById('saved-count-txt').textContent=n;
}

// ══════════════════════════════════════
//  FRIDGE
// ══════════════════════════════════════

function switchFridge(tab) {
  document.getElementById('fv-cat').style.display=tab==='cat'?'block':'none';
  document.getElementById('fv-exp').style.display=tab==='exp'?'block':'none';
  document.getElementById('ftab-cat').className='tab '+(tab==='cat'?'on':'off');
  document.getElementById('ftab-exp').className='tab '+(tab==='exp'?'on':'off');
}

// ══════════════════════════════════════
//  PLANNING
// ══════════════════════════════════════

function setPlanTab(tab, el) {
  document.querySelectorAll('.ptab').forEach(t=>t.className='ptab off');
  el.className='ptab on';
  const map={plan:'pv-plan',recipes:'pv-recipes',cal:'pv-cal',groc:'pv-groc'};
  Object.entries(map).forEach(([k,id])=>{
    const v=document.getElementById(id);
    if(v) v.style.display=k===tab?'':'none';
  });
  if(tab==='groc') renderGrocery();
  if(tab==='cal')  renderCalMeals();
}

function renderMealPlan() {
  const list=document.getElementById('mp-list');
  const empty=document.getElementById('mp-empty');
  const count=document.getElementById('mp-count');
  document.getElementById('saved-count-txt').textContent=STATE.savedRecipes.length;
  if(!STATE.mealPlan.length){list.innerHTML='';empty.style.display='block';count.textContent='';return;}
  empty.style.display='none';
  count.textContent=`(${STATE.mealPlan.length} meals)`;
  const days=['Mon','Tue','Wed','Thu','Fri','Sat'];
  list.innerHTML=STATE.mealPlan.map((m,i)=>`
    <div class="mc" onclick="openMealPlanRecipe(${i})">
      <div class="mc-img" style="${m.image?`background:url('${m.image}') center/cover no-repeat;font-size:0`:''}">
        ${m.image?'':m.emoji}
      </div>
      <div style="flex:1">
        <div class="mc-title">${m.name}</div>
        <div class="mc-meta">${m.meta||''}</div>
        <div class="mc-tags"><span class="mtag">${days[i%6]}</span><span class="mtag b">Planned</span></div>
      </div>
      <button style="background:none;border:none;font-size:14px;cursor:pointer;color:var(--m3);padding:4px;flex-shrink:0" onclick="event.stopPropagation();removeMeal(${i})">✕</button>
    </div>`).join('');
}

function openMealPlanRecipe(i) {
  const m=STATE.mealPlan[i];
  STATE.currentRecipe=m.recipe||findRecipeByName(m.name);
  go('recipe-detail');
}

function removeMeal(idx) {
  STATE.mealPlan.splice(idx,1);
  renderMealPlan(); renderGrocery(); renderWeeklySchedule();
  toast('Meal removed from plan');
}

function renderWeeklySchedule() {
  const el=document.getElementById('weekly-schedule');
  const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  if(!STATE.mealPlan.length){el.innerHTML='<div style="padding:8px 14px;font-size:12px;color:var(--m3)">No meals planned yet — add some above!</div>';return;}
  el.innerHTML=days.slice(0,Math.max(5,STATE.mealPlan.length)).map((d,i)=>{
    const m=STATE.mealPlan[i];
    return `<div class="day-row"><div class="day-lbl">${d}</div><div class="day-meals">${m?`${m.emoji} ${m.name}`:'<span style="color:var(--m3);font-style:italic">No meal planned</span>'}</div></div>`;
  }).join('');
}

function renderCalMeals() {
  const el=document.getElementById('cal-meals');
  if(!STATE.mealPlan.length){el.innerHTML='';return;}
  el.innerHTML='<div style="padding:10px 14px 4px;font-size:13px;font-weight:800;color:var(--mocha)">Planned meals</div>'+
    STATE.mealPlan.map((m,i)=>`
      <div class="mc" onclick="openMealPlanRecipe(${i})">
        <div class="mc-img" style="${m.image?`background:url('${m.image}') center/cover no-repeat;font-size:0`:''}">
          ${m.image?'':m.emoji}
        </div>
        <div><div class="mc-title">${m.name}</div><div class="mc-meta">${m.meta||''}</div></div>
      </div>`).join('');
}

// ══════════════════════════════════════
//  GROCERY
// ══════════════════════════════════════

function renderGrocery() {
  const buyList=document.getElementById('groc-buy-list');
  const empty=document.getElementById('groc-empty');
  const hdr=document.getElementById('groc-buy-hdr');
  const needed={};

  STATE.mealPlan.forEach(meal=>{
    const r=meal.recipe||STATE.recipeCache[meal.id]||findRecipeByName(meal.name);
    if(!r) return;
    if(r.missedIngredients && r.missedIngredients.length) {
      r.missedIngredients.forEach(ing=>{
        const qty=`${ing.amount||''} ${ing.unit||''}`.trim();
        if(!needed[ing.name]) needed[ing.name]=qty;
      });
    } else if(r.ingredients) {
      r.ingredients.filter(i=>!i.h).forEach(i=>{ if(!needed[i.n]) needed[i.n]=i.q; });
    }
  });

  if(!STATE.mealPlan.length){needed['Chicken breast']='400g';needed['Lemon']='2 pcs';needed['Feta cheese']='100g';}

  const buy=Object.entries(needed).filter(([n])=>!FRIDGE.some(f=>f.toLowerCase()===n.toLowerCase()));
  if(!buy.length){buyList.innerHTML='';empty.style.display='block';hdr.style.display='none';return;}
  empty.style.display='none'; hdr.style.display='block';
  hdr.textContent=`🛒 Need to buy (${buy.length} items)`;
  buyList.innerHTML=buy.map(([name,qty])=>`
    <div class="gi" onclick="this.classList.toggle('checked')"><div class="gc"></div><div class="gn">${name}</div><div style="font-size:12px;color:var(--m3)">${qty}</div></div>`).join('');
}

// ══════════════════════════════════════
//  RECIPE DETAIL
// ══════════════════════════════════════

function renderRecipeDetail() {
  const r=STATE.currentRecipe||FALLBACK_RECIPES[0];

  const rdImg=document.getElementById('rd-img');
  const rdEmoji=document.getElementById('rd-emoji');
  if(r.image && rdImg) {
    rdImg.src=r.image; rdImg.style.display='block';
    if(rdEmoji) rdEmoji.style.display='none';
  } else {
    if(rdImg) rdImg.style.display='none';
    if(rdEmoji){rdEmoji.style.display='flex';rdEmoji.textContent=r.emoji||'🍽️';}
  }

  document.getElementById('rd-title').textContent=r.name;

  // Mood chip under title
  const moodChip = getRecipeMoodChip(r);
  const old = document.getElementById('rd-mood-chip');
  if (old) old.remove();
  if (moodChip) {
    const moodEl = document.createElement('div');
    moodEl.id = 'rd-mood-chip';
    moodEl.style.marginBottom = '6px';
    moodEl.style.paddingLeft = '16px';
    moodEl.innerHTML = moodChip;
    const titleEl = document.getElementById('rd-title');
    if (titleEl) titleEl.insertAdjacentElement('afterend', moodEl);
  }

  document.getElementById('rd-desc').textContent=r.desc||'';
  document.getElementById('rd-stats').innerHTML=[
    {v:r.time||'',l:'Time'},{v:r.kcal||'',l:'Calories'},{v:r.diff||'',l:'Difficulty'},
    {v:'🛒 List',l:'Grocery',g:true}
  ].map(s=>`<div class="rds${s.g?' groc':''}" ${s.g?'onclick="goToGrocery()"':''}>
    <div class="rds-v">${s.v}</div><div class="rds-l">${s.l}</div></div>`).join('');

  document.getElementById('rd-ingredients').innerHTML=(r.ingredients||[]).map(i=>`
    <div class="rd-ing">
      <span style="font-size:13px;font-weight:600;color:var(--mocha)">${i.n}</span>
      <div style="display:flex;align-items:center;gap:6px">
        <span style="font-size:12px;color:var(--m3)">${i.q}</span>
        <span class="${i.h?'g-have':'g-buy'}">${i.h?'In fridge ✓':'Buy 🛒'}</span>
      </div>
    </div>`).join('');

  document.getElementById('rd-steps').innerHTML=(r.steps||[]).map((s,i)=>`
    <div class="rd-step"><div class="rd-sn">${i+1}</div><div class="rd-st">${s}</div></div>`).join('');

  const tip=document.getElementById('rd-tip');
  if(r.tip){tip.style.display='block';tip.textContent=r.tip;}else tip.style.display='none';

  const inPlan=STATE.mealPlan.find(m=>m.name===r.name);
  const btn=document.getElementById('rd-plan-btn');
  btn.textContent=inPlan?'✓ In meal plan':'+ Add to plan';
  btn.style.background=inPlan?'var(--green)':'var(--orange)';

  const saved=STATE.savedRecipes.find(s=>s.name===r.name);
  document.getElementById('rd-bkbtn').style.background=saved?'#fde2d4':'rgba(255,255,255,.88)';
}

function addToPlan() {
  const r=STATE.currentRecipe||FALLBACK_RECIPES[0];
  if(STATE.mealPlan.find(m=>m.name===r.name)){toast('Already in your meal plan ✓');return;}
  STATE.mealPlan.push({name:r.name,emoji:r.emoji,image:r.image||null,meta:`${r.time} · ${r.kcal}`,id:r.id,recipe:r});
  renderRecipeDetail(); renderGrocery(); renderWeeklySchedule();
  toast(`✅ ${r.name} added to meal plan!`);
}

function toggleSaveRecipe() {
  const r=STATE.currentRecipe||FALLBACK_RECIPES[0];
  const idx=STATE.savedRecipes.findIndex(s=>s.name===r.name);
  if(idx>=0){STATE.savedRecipes.splice(idx,1);toast('Removed from saved');}
  else{STATE.savedRecipes.push({name:r.name,emoji:r.emoji,image:r.image||null,source:'manual',meta:`${r.time} · ${r.kcal}`,id:r.id,recipe:r});toast(`🔖 ${r.name} saved!`);}
  renderRecipeDetail(); updateSavedBadge();
}

function goToGrocery() {
  const r=STATE.currentRecipe||FALLBACK_RECIPES[0];
  if(!STATE.mealPlan.find(m=>m.name===r.name))
    STATE.mealPlan.push({name:r.name,emoji:r.emoji,image:r.image||null,meta:`${r.time} · ${r.kcal}`,id:r.id,recipe:r});
  nav('planning');
  setPlanTab('groc',document.getElementById('ptab-groc'));
  toast('🛒 Grocery list updated!');
}

// ══════════════════════════════════════
//  SAVED RECIPES
// ══════════════════════════════════════

let srFilter='all';

function renderSavedRecipes() {
  const list=document.getElementById('sr-list');
  const empty=document.getElementById('sr-empty');
  let items=STATE.savedRecipes;
  if(srFilter!=='all') items=items.filter(r=>r.source===srFilter);
  if(!items.length){list.innerHTML='';empty.style.display='block';return;}
  empty.style.display='none';
  list.innerHTML='<div style="height:6px"></div>'+items.map(r=>`
    <div class="sr-card" onclick="openSavedRecipe('${r.name.replace(/'/g,"\\'").replace(/"/g,'&quot;')}')">
      <div class="src-img" style="${r.image?`background:url('${r.image}') center/cover no-repeat;font-size:0`:''}">${r.image?'':r.emoji}</div>
      <div style="flex:1">
        <div style="font-size:14px;font-weight:800;color:var(--mocha);margin-bottom:2px">${r.name}</div>
        <div style="font-size:11px;color:var(--m3)">${r.meta||''}</div>
        <span class="src-source ${r.source}">${r.source==='tinder'?'Swipe':r.source==='social'?'Social':'Manual'}</span>
      </div>
      <button class="sr-pbtn" onclick="event.stopPropagation();addSavedToPlan('${r.name.replace(/'/g,"\\'").replace(/"/g,'&quot;')}')">+ Plan</button>
    </div>`).join('');
}

function openSavedRecipe(name) {
  const sr=STATE.savedRecipes.find(s=>s.name===name);
  STATE.currentRecipe=sr?.recipe||findRecipeByName(name);
  go('recipe-detail');
}

function addSavedToPlan(name) {
  const sr=STATE.savedRecipes.find(s=>s.name===name);
  const r=sr?.recipe||findRecipeByName(name);
  if(!STATE.mealPlan.find(m=>m.name===name)){
    STATE.mealPlan.push({name:r.name,emoji:r.emoji,image:r.image||null,meta:`${r.time} · ${r.kcal}`,id:r.id,recipe:r});
    renderGrocery(); renderWeeklySchedule();
    toast(`✅ ${name} added to meal plan!`);
  } else toast('Already in your meal plan ✓');
}

function filterSavedCat(cat,el) {
  srFilter=cat;
  document.querySelectorAll('#sr-filters .fchip').forEach(c=>c.className='fchip off');
  el.className='fchip on';
  renderSavedRecipes();
}

function filterSaved(q) {
  const items=STATE.savedRecipes.filter(r=>r.name.toLowerCase().includes(q.toLowerCase()));
  const list=document.getElementById('sr-list');
  const empty=document.getElementById('sr-empty');
  if(!items.length){list.innerHTML='';empty.style.display='block';return;}
  empty.style.display='none';
  list.innerHTML=items.map(r=>`
    <div class="sr-card" onclick="openSavedRecipe('${r.name.replace(/'/g,"\\'").replace(/"/g,'&quot;')}')">
      <div class="src-img" style="${r.image?`background:url('${r.image}') center/cover no-repeat;font-size:0`:''}">${r.image?'':r.emoji}</div>
      <div><div style="font-size:14px;font-weight:800;color:var(--mocha)">${r.name}</div>
      <div style="font-size:11px;color:var(--m3)">${r.meta||''}</div></div>
    </div>`).join('');
}

// ══════════════════════════════════════
//  PROFILE
// ══════════════════════════════════════

const PROF_RECIPES=[
  {n:'Rice Bowl',       img:'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&auto=format&fit=crop&q=80',l:24,c:5},
  {n:"Chicken Fajita's",img:'https://images.unsplash.com/photo-1562802378-063ec186a863?w=300&auto=format&fit=crop&q=80',l:41,c:12},
  {n:'Veggie Burrito',  img:'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&auto=format&fit=crop&q=80',l:18,c:3},
  {n:'Mac & Cheese',    img:'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&auto=format&fit=crop&q=80',l:31,c:7},
  {n:'Caesar Salad',    img:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=80',l:14,c:2},
  {n:'Lentil Soup',     img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&auto=format&fit=crop&q=80',l:22,c:6},
  {n:'Pancakes',        img:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&auto=format&fit=crop&q=80',l:9,c:1},
  {n:'Coconut Curry',   img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&auto=format&fit=crop&q=80',l:37,c:9},
];
const SVG_HEART = `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13.5S2 9.8 2 5.5a3 3 0 0 1 6-1 3 3 0 0 1 6 1C14 9.8 8 13.5 8 13.5Z"/></svg>`;
const SVG_CHAT  = `<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 7A6 6 0 1 1 2 7a6 6 0 0 1 12 0Z"/><path d="M2.5 13.5 2 15l2-1"/></svg>`;
const SVG_STAR  = `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.4l-3.7 2 .7-4.1-3-2.9 4.2-.8Z"/></svg>`;
function renderProfileGrid() {
  const api = STATE.tinderQueue.length >= 4 ? STATE.tinderQueue : null;
  document.getElementById('prof-grid').innerHTML=PROF_RECIPES.map((r,i)=>{
    const ar = api?.[i];
    const name = (ar ? ar.name : r.n).replace(/'/g,"&#39;");
    const imgSrc = ar?.image || r.img;
    const photoHTML = imgSrc
      ? `<img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;display:block">`
      : '';
    return `<div class="pgitem" onclick="STATE.currentRecipe=findRecipeByName('${name}');go('recipe-detail')">
      <div class="pgi-photo" style="padding:0;overflow:hidden">${photoHTML}</div>
      <div class="pgi-name">${ar ? ar.name : r.n}</div>
      <div class="pgi-acts">
        <button class="pgi-act" onclick="event.stopPropagation();toggleProfileLike(this,${r.l})">${SVG_HEART} <span>${r.l}</span></button>
        <button class="pgi-act">${SVG_CHAT} <span>${r.c}</span></button>
        <button class="pgi-act starred" onclick="event.stopPropagation();toast('Recipe starred!')">${SVG_STAR}</button>
      </div>
    </div>`;
  }).join('');
}
function toggleProfileLike(btn,base) {
  btn.classList.toggle('liked');
  const span = btn.querySelector('span');
  if(span) span.textContent = btn.classList.contains('liked') ? base+1 : base;
}

// ══════════════════════════════════════
//  RECAP
// ══════════════════════════════════════

function setRecapTab(tab,el) {
  document.querySelectorAll('.rtab').forEach(t=>t.classList.remove('on'));
  el.classList.add('on');
  document.getElementById('rv-impact').style.display=tab==='impact'?'':'none';
  document.getElementById('rv-lb').style.display=tab==='lb'?'':'none';
  if(tab==='impact') document.getElementById('recap-meal-count').textContent=STATE.mealPlan.length+STATE.savedRecipes.length;
}

// ══════════════════════════════════════
//  MODAL
// ══════════════════════════════════════

const MODAL_CFG = {
  fridge:{title:'Add to Fridge',btns:[
    {t:'Scan with camera',fn:"closeModal();toast('Camera opened')"},
    {t:'Scan your receipt',fn:"closeModal();toast('Receipt scanner ready')"},
    {t:'Add manually',fn:"closeModal();toast('Manual entry coming soon')"},
  ]},
  social:{title:'Share a Recipe',btns:[
    {t:'Take a photo',fn:"closeModal();toast('Camera opened')"},
    {t:'Choose from gallery',fn:"closeModal();toast('Gallery opened')"},
    {t:'Write a recipe post',fn:"closeModal();toast('Post editor coming soon')"},
  ]},
  planning:{title:'Add a Meal',btns:[
    {t:'Find recipes (Swipe)',fn:"closeModal();go('tinder')"},
    {t:'Pick from Saved Recipes',fn:"closeModal();go('saved-recipes')"},
    {t:'Add meal manually',fn:"closeModal();toast('Manual entry coming soon')"},
  ]},
};

function openModal(ctx) {
  const cfg=MODAL_CFG[ctx]||MODAL_CFG.fridge;
  document.getElementById('mo-title').textContent=cfg.title;
  document.getElementById('mo-content').innerHTML=cfg.btns.map((b,i)=>
    `${i>0?'<div class="mo-or">or</div>':''}<button class="mo-btn" onclick="${b.fn}">${b.t}</button>`
  ).join('');
  document.getElementById('modal').classList.add('open');
}
function closeModal(){document.getElementById('modal').classList.remove('open');}
function closeModalOutside(e){if(e.target.id==='modal')closeModal();}

// ══════════════════════════════════════
//  TOAST
// ══════════════════════════════════════

let _ttimer;
function toast(msg) {
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(_ttimer);
  _ttimer=setTimeout(()=>t.classList.remove('show'),2400);
}

// ══════════════════════════════════════
//  MOOD
// ══════════════════════════════════════

function getMoodState() {
  try {
    const s = JSON.parse(localStorage.getItem('savr_mood') || 'null');
    if (s && s.date === new Date().toDateString()) return s;
  } catch(e) {}
  return null;
}

function saveMoodState(emotion, shopping) {
  localStorage.setItem('savr_mood', JSON.stringify({
    emotion, shopping, date: new Date().toDateString()
  }));
}

function checkMoodSplash() {
  renderMoodSplash();
}

function renderMoodSplash() {
  document.getElementById('mc-grid').innerHTML = MOODS.map(m =>
    `<div class="mc-card" onclick="selectEmotion('${m.id}',this)">
      ${MOOD_SVGS[m.id]}
      <div class="mc-label">${m.label}</div>
    </div>`
  ).join('');
  document.getElementById('ms-shop-row').innerHTML = SHOPPING_MOODS.map(s =>
    `<div class="ms-card" onclick="selectShopping('${s.id}',this)">
      ${SHOPPING_SVGS[s.id]}
      <div class="ms-card-label">${s.label}</div>
    </div>`
  ).join('');
  document.getElementById('mood-splash').classList.remove('hidden');
}

let _selEmotion = null, _selShopping = null;

function selectEmotion(id, el) {
  _selEmotion = id;
  document.querySelectorAll('.mc-card').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  _updateConfirmBtn();
}

function selectShopping(id, el) {
  _selShopping = id;
  document.querySelectorAll('.ms-card').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  _updateConfirmBtn();
}

function _updateConfirmBtn() {
  const btn = document.getElementById('mood-confirm-btn');
  btn.disabled = !(_selEmotion && _selShopping);
}

function confirmMood() {
  const e = _selEmotion || 'chill';
  const s = _selShopping || 'any';
  saveMoodState(e, s);
  document.getElementById('mood-splash').classList.add('hidden');
  if (STATE.tinderQueue.length) { applyMoodFilter(); renderTinderCard(); }
}

function skipMood() {
  saveMoodState('chill', 'any');
  document.getElementById('mood-splash').classList.add('hidden');
}

function applyMoodFilter() {
  const mood = getMoodState();
  if (!mood) return;
  const shop = SHOPPING_MOODS.find(s => s.id === mood.shopping) || SHOPPING_MOODS[2];
  let q = STATE.tinderQueue.filter(r => (r.missedIngredients?.length || 0) <= shop.maxMissed);
  if (q.length < 4) q = STATE.tinderQueue; // safety fallback
  switch(mood.emotion) {
    case 'hungry':
      q.sort((a,b) => (parseInt(b.kcal)||0) - (parseInt(a.kcal)||0)); break;
    case 'tired':
      q.sort((a,b) => (parseInt(a.time)||999) - (parseInt(b.time)||999)); break;
    case 'healthy':
      q.sort((a,b) => (parseInt(a.kcal)||999) - (parseInt(b.kcal)||999)); break;
    case 'comfort':
      q.sort((a,b) => {
        const w = /soup|pasta|mac|cheese|stew|bake|roast|noodle|casserole/i;
        return (w.test(a.name)?0:1) - (w.test(b.name)?0:1);
      }); break;
    case 'adventurous':
      q.sort((a,b) => {
        const w = /thai|indian|japanese|korean|vietnamese|moroccan|mexican|persian|exotic/i;
        return (w.test(a.name+a.desc)?0:1) - (w.test(b.name+b.desc)?0:1);
      }); break;
  }
  STATE.tinderQueue = q;
  STATE.tinderIdx = 0;
}

function getMoodBadge() {
  const mood = getMoodState();
  if (!mood || mood.emotion === 'chill') return null;
  const m = MOODS.find(x => x.id === mood.emotion);
  return m ? {label: m.label + ' pick', color: m.color, bg: m.bg} : null;
}

function detectRecipeMood(recipe) {
  const t = ((recipe?.name||'') + ' ' + (recipe?.desc||'')).toLowerCase();
  const mins = parseInt(recipe?.time) || 30;
  const kcal = parseInt(recipe?.kcal) || 400;
  if (/thai|indian|japanese|korean|vietnamese|moroccan|mexican|exotic/i.test(t)) return 'adventurous';
  if ((/salad|light|fresh|veggie|vegetable/i.test(t)) && kcal < 400) return 'healthy';
  if (/soup|stew|mac|cheese|pasta|bake|warm|casserole/i.test(t)) return 'comfort';
  if (mins <= 15) return 'tired';
  if (kcal > 700) return 'hungry';
  return 'chill';
}

function getRecipeMoodChip(recipe) {
  const id = detectRecipeMood(recipe);
  const m = MOODS.find(x => x.id === id);
  if (!m || id === 'chill') return '';
  const svgIcon = MOOD_SVGS[id]
    ? `<span style="display:inline-block;width:22px;height:22px;vertical-align:middle;margin-right:5px;flex-shrink:0">${MOOD_SVGS[id]}</span>`
    : '';
  return `<span class="recipe-mood-chip" style="background:${m.bg};color:${m.color};display:inline-flex;align-items:center">${svgIcon}${m.label}</span>`;
}

function getMoodEmoji(id) {
  return {hungry:'🥨',tired:'🍦',comfort:'🧁',chill:'😌',healthy:'🍇',adventurous:'🌶️'}[id] || '🍽️';
}

// ══════════════════════════════════════
//  INIT
// ══════════════════════════════════════

renderFeed();
renderProfileGrid();
renderMealPlan();
renderGrocery();
renderWeeklySchedule();
loadSocialFeed();
checkMoodSplash();
