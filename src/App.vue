<script setup lang="ts">
import {
  AppContext,
  computed,
  createVNode,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  render,
  VNodeProps
} from 'vue'
import { ErrorType, Step } from './types'
import ExampleTask from './components/ExampleTask.vue'
import axios from 'axios'

const ePanelOpen = ref(0)
const { appContext } = getCurrentInstance()!

function renderComponent(el: Element, component: any, props: VNodeProps, appContext: AppContext) {
  const vnode = createVNode(component, props)
  vnode.appContext = { ...appContext }
  render(vnode, el)

  return () => {
    render(null, el)
  }
}

const exampleSteps1: Step[] = [
  'Gather your ingredients.',
  'Preheat the oven to 350 °F (177 °C) and grease and flour the cake pan.',
  'In a large bowl, mix the dry ingredients.',
  'Cut the apples into small pieces and add them to the bowl.',
  'Pour the batter into the cake pan.',
  'Bake the cake for 1 hour.',
  'Take the cake from the oven and let it cool.',
  'Serve'
].map((v) => ({ content: v, type: ErrorType.NoError, checked: false }))
const exampleSimilarGoals1: { goal: string; steps: Step[] }[] = [
  {
    goal: 'Make Chocolate Cake',
    steps: [
      'Gather your ingredients.',
      'Preheat the oven to 350 °F (177 °C) and grease and flour the cake pan.',
      'Mix the wet ingredients in a large bowl.',
      'Mix the dry ingredients in a separate bowl.',
      'Add the dry mixture to the wet mixture slowly.',
      'Pour the batter into the cake pan.',
      'Put the pan in the oven and bake the cake for 30 minutes.',
      'Take the cake from the oven and let it cool.',
      'Invert the cake onto a plate.',
      'Let the cake cool completely before frosting it.'
    ].map((v) => ({ content: v, type: ErrorType.NoError, checked: false }))
  },
  {
    goal: 'Make A Vanilla Cake',
    steps: [
      'Gather your ingredients.',
      'Preheat the oven to 325 °F (163 °C) and grease and flour the cake pan.',
      'Cream the butter and sugar.',
      'Add the eggs and vanilla.',
      'Stir in the cake flour.',
      'Pour the batter into the pan.',
      'Bake the cake for 1 hour 15 minutes.'
    ].map((v) => ({ content: v, type: ErrorType.NoError, checked: false }))
  }
]

const exampleSteps2: Step[] = [
  'Beat together the egg yolks, sugar, salt, and baking powder.',
  'Add in the flour, milk, oil, and vanilla extract.',
  'Fold in the egg whites.',
  'Place the bacon in a griddle over medium-high heat.',
  'Set the bacon aside on some paper towels.',
  'Pour the batter over each strip of bacon.',
  'Cook the pancakes.',
  'Continue cooking the rest of the pancakes.',
  'Serve the pancakes immediately.'
].map((v) => ({ content: v, type: ErrorType.NoError, checked: false }))

const exampleSimilarGoals2: { goal: string; steps: Step[] }[] = [
  {
    goal: 'Make Nutella Stuffed Pancakes',
    steps: [
      'Place 6 to 7 dollops of Nutella onto a baking sheet lined with parchment paper.',
      'Spread the dollops into disks.',
      'Freeze the disks until they turn solid.',
      'Whisk together the dry ingredients.',
      'Melt some butter in a non-stick pan, then wipe it off.',
      'Take out 2 to 3 Nutella disks.',
      'Add some batter into the pan.',
      'Place a Nutella disk on top of each pancake.',
      'Top each pancake off with more batter.',
      'Flip the pancake when the bubbles appear.',
      'Continue cooking the pancake until it is golden.',
      'Make the rest of the pancakes.',
      'Serve the pancakes.'
    ].map((v) => ({ content: v, type: ErrorType.NoError, checked: false }))
  },
  {
    goal: 'Make Bacon Stuffed Pancakes',
    steps: [
      'Separate the yolks from the whites.',
      'Combine the yolks, sugar, salt, and baking powder.',
      'Add in the flour, milk, oil, and vanilla extract.',
      'Fold in the egg whites.',
      'Let the batter rest for 15 to 30 minutes.',
      'Fry the bacon in a griddle over medium-high heat.',
      'Set the bacon aside on some paper towels.',
      'Place the bacon back onto the griddle.',
      'Pour the batter over each strip of bacon.',
      'Cook the pancakes.',
      'Continue cooking the rest of the pancakes.',
      'Serve the pancakes immediately.'
    ].map((v) => ({ content: v, type: ErrorType.NoError, checked: false }))
  }
]

const exampleSteps3: Step[] = [
  'Read the form entitled Instructions for Filing a Change of Name.',
  'Complete the required criminal background check.',
  'Complete a Petition for Change of Name.',
  'Prepare for your hearing.',
  'File your petition.',
  'Attend your hearing.',
  'Collect your final decree.',
  'Present your final decree as evidence of your name change.'
].map((v) => ({ content: v, type: ErrorType.NoError, checked: false }))

const exampleSimilarGoals3: { goal: string; steps: Step[] }[] = [
  {
    goal: 'Change Your Name as an Adult',
    steps: [
      'Download, complete, and sign the name change packet.',
      'Download, complete, and sign the Civil Case Information Statement, if necessary.',
      'Make sure your forms are complete.',
      'File the forms with the Superior Court in the county in which you live.',
      'Wait for a response from the court.',
      'Contact the newspaper and have your notice published.',
      'Give notice by mail to any required persons.',
      'Submit your affidavit of publication to the court.',
      'Attend your court hearing.',
      'Publish the final judgment.',
      'Order two copies of your final judgment from the court.',
      'Notify other government offices of your name change.',
      'Send one certified copy of your final judgment to the New Jersey Treasury Department.',
      'Send your second certified copy to the Registrar of Vital Statistics or Department of Health in the capital city of the state in which you were born.'
    ].map((v) => ({ content: v, type: ErrorType.NoError, checked: false }))
  },
  {
    goal: 'Change Your Name Due to Marriage',
    steps: [
      'Change your name on your social security card.',
      "Change your name on your driver's license or picture ID card.",
      "Use your new driver's license or picture ID card to change your name as needed."
    ].map((v) => ({ content: v, type: ErrorType.NoError, checked: false }))
  }
]

const exampleSteps4: Step[] = [
  'Preheat the oven to 325 °F (163 °C) and grease and flour a cake pan.',
  'Gather your ingredients.',
  'Buy your ingredients.',
  'Cream the butter and salt.',
  'Add the eggs and vanilla.',
  'Stir in the cake flour.',
  'Have a shower.',
  'Pour the batter into the pan.',
  'Bake the cake for 1 hour 15 minutes.'
].map((v) => ({ content: v, type: ErrorType.NoError, checked: false }))
const exampleSimilarGoals4: { goal: string; steps: Step[] }[] = [
  {
    goal: 'Make Chocolate Cake',
    steps: [
      'Gather your ingredients.',
      'Preheat the oven to 350 °F (177 °C) and grease and flour the cake pan.',
      'Mix the wet ingredients in a large bowl.',
      'Mix the dry ingredients in a separate bowl.',
      'Add the dry mixture to the wet mixture slowly.',
      'Pour the batter into the cake pan.',
      'Put the pan in the oven and bake the cake for 30 minutes.',
      'Take the cake from the oven and let it cool.',
      'Invert the cake onto a plate.',
      'Let the cake cool completely before frosting it.'
    ].map((v) => ({ content: v, type: ErrorType.NoError, checked: false }))
  },
  {
    goal: 'Make Apple Cake',
    steps: [
      'Gather your ingredients.',
      'Grease and flour the cake pan, then preheat the oven to 350 °F (177 °C).',
      'Melt the butter and allow it to cool.',
      'Stir the dry ingredients in a small bowl.',
      'Prepare the apples.',
      'Blend the wet ingredients.',
      'Add the dry mixture to the wet mixture.',
      'Fold in the apples.',
      'Pour the batter into the pan.',
      'Bake the cake for about 50 minutes.'
    ].map((v) => ({ content: v, type: ErrorType.NoError, checked: false }))
  }
]
exampleSteps4[0].type = ErrorType.WrongOrder
exampleSteps4[1].type = ErrorType.Repeat
exampleSteps4[2].type = ErrorType.Repeat
exampleSteps4[3].type = ErrorType.Incoherent
exampleSteps4[4].type = ErrorType.Missing
exampleSteps4[6].type = ErrorType.Unrelated

const gotoInstruction = () => {
  ePanelOpen.value = 0
  window.scrollTo(0, 0)
}

const convertPlan = (plan: string[]) =>
  plan
    .map((v) => v.replace(/^\d+\./g, ''))
    .map((v) => ({ content: v, type: ErrorType.NoError, checked: false }))

const tasks = ref(
  [
    {
      'General Goal': 'Make Lemon Pepper Seasoning',
      'Specific Goal': 'Make Lemon Pepper Seasoning for Ribs',
      CONSTRAINT: 'for Ribs',
      Plan: [
        '1. Combine the ingredients.',
        '2. Rub the mixture onto the ribs.',
        '3. Grill the ribs.'
      ],
      'Similar Goals with Plans': [
        {
          'Specific Goal': 'Method One: Quick-Mix Lemon Pepper Seasoning',
          CONSTRAINT: 'Method One: Quick-Mix',
          Plan: ['1. Combine the ingredients.', '2. Store in an airtight container.']
        },
        {
          'Specific Goal': 'Method Two: Shortcut Lemon Pepper Seasoning',
          CONSTRAINT: 'Method Two: Shortcut',
          Plan: [
            '1. Place the ingredients in a food processor.',
            '2. Pulse until finely ground.',
            '3. Store in an airtight container.'
          ]
        },
        {
          'Specific Goal': 'Method Three: Fresh Lemon Pepper Seasoning',
          CONSTRAINT: 'Method Three: Fresh',
          Plan: [
            '1. Preheat the oven to 200 degrees Fahrenheit (90 degrees Celsius).',
            '2. Zest the lemons.',
            '3. Crush the peppercorns.',
            '4. Combine the lemon zest and peppercorns.',
            '5. Bake until dried.',
            '6. Grind down the mixture.',
            '7. Combine with salt.',
            '8. Store in an airtight container.'
          ]
        }
      ]
    },
    {
      'General Goal': 'Make an Ocean Diorama for Earth Day',
      'Specific Goal': 'Make an Atlantic Ocean Diorama for Earth Day',
      CONSTRAINT: 'Atlantic',
      Plan: [
        '1. Choose a large fish to be the focus of your diorama.',
        '2. Place the fish in the center of your diorama.',
        '3. Hang smaller fish and other ocean creatures around the large fish.',
        '4. Use blue construction paper or acetate to create waves around the fish.',
        '5. Glue coral, shells, and plants around the fish.',
        '6. Create a title for your diorama.'
      ],
      'Similar Goals with Plans': [
        {
          'Specific Goal': 'Create an Ocean Diorama Background',
          CONSTRAINT: 'Create Background',
          Plan: [
            '1. Trace the bottom of the container shape on your blue background paper.',
            '2. Trace the sides of the container with the same color of background paper.',
            '3. Draw an ocean scene on your background paper, as depicted in your sketch.',
            '4. Glue the background and side panels into your diorama.',
            '5. Add 3D objects to the bottom of your diorama for the mid-level of your ocean scene.'
          ]
        },
        {
          'Specific Goal': 'Create an Ocean Diorama Foreground',
          CONSTRAINT: 'Create Foreground',
          Plan: [
            '1. Find plastic fish, mammals or humans to use in your diorama.',
            '2. Make your own creatures, if you prefer.',
            '3. Hang plastic or cardboard creatures from the top of your diorama.',
            '4. Cover the top and sides of your diorama with a large piece of construction paper, if you have many pieces of thread poking through the top.',
            '5. Create a title for your Earth Day diorama.'
          ]
        }
      ]
    },
    {
      'General Goal': 'Make a Coke Float',
      'Specific Goal': 'Make a Coke Float with Chocolate Ice Cream',
      CONSTRAINT: 'with Chocolate Ice Cream',
      Plan: [
        '1. Fill a glass with chocolate ice cream.',
        '2. Add the cola.',
        '3. Top it off with whipped cream (optional).',
        '4. Serve.'
      ],
      'Similar Goals with Plans': [
        {
          'Specific Goal': 'Make a Classic Coke Float',
          CONSTRAINT: 'Classic',
          Plan: [
            '1. Fill a glass 3/4 with cola.',
            '2. Add the ice cream.',
            '3. Top off your float.',
            '4. Mix it up (optional).',
            '5. Serve.'
          ]
        },
        {
          'Specific Goal': 'Make a Coke Float Cocktail',
          CONSTRAINT: 'Cocktail',
          Plan: [
            '1. Fill a tall glass with ice.',
            '2. Add your cream.',
            '3. Add the cola.',
            '4. Enjoy!'
          ]
        }
      ]
    },
    {
      'General Goal': 'Prepare a Vegan Thanksgiving Dinner',
      'Specific Goal': 'Prepare a Vegan Thanksgiving Dinner for 2',
      CONSTRAINT: 'for 2',
      Plan: [
        '1. Preheat oven to 375 degrees F (190 degrees C).',
        '2. Line a baking sheet with parchment paper and spread 1 cup (237 ml) of cranberry sauce in the center.',
        '3. Place 2 frozen vegan turkey breasts on top of the cranberry sauce.',
        '4. Bake in the oven for 30 minutes.',
        '5. Remove from oven and let rest for 5 minutes before slicing.',
        '6. Serve with mashed potatoes and gravy, stuffing, and roasted vegetables.'
      ],
      'Similar Goals with Plans': [
        {
          'Specific Goal': 'Vegan Thanksgiving Sides and Starters',
          CONSTRAINT: 'Sides and Starters',
          Plan: [
            '1. Prepare a vegan soup.',
            '2. Puree the soup with an immersion blender.',
            '3. Make vegan sides for Thanksgiving dinner.',
            '4. Spread the cut vegetables out on a baking sheet in a single layer.',
            '5. Roast the vegetables in an oven at 450 degree Fahrenheit (232 degrees Celsius) for 20 minutes.',
            '6. Boil peeled and cubed potatoes in a saucepan for 25 minutes until the potatoes are very tender and falling apart to make mashed potatoes.',
            '7. Drain the potatoes, then push through a ricer or mash with a potato masher.',
            '8. Add soy milk and margarine, and stir until the potatoes have absorbed the milk and fat.',
            '9. Make vegan Thanksgiving stuffing by sauteing a chopped onion, chopped carrot, and chopped celery stalk.',
            '10. Stir in 1 pound (454 kg) of bread cubes for every 6 people you plan on serving.',
            '11. Pour 2 cups (454 g) vegetable stock over the bread and vegetable mixture and let it soak for 5 minutes.',
            '12. Transfer to a baking dish, and bake in an oven set at 350 degree Fahrenheit (177 degrees Celsius) for about 20 minutes.'
          ]
        },
        {
          'Specific Goal': 'Vegan Thanksgiving Dessert',
          CONSTRAINT: 'Dessert',
          Plan: [
            '1. Make a vegan pumpkin pie by using a pre made vegan pie crust.',
            '2. Replace the ingredients in your favorite pumpkin pie recipe with non-dairy alternatives.'
          ]
        }
      ]
    },
    {
      'General Goal': 'Clean Microsuede',
      'Specific Goal': 'Clean Microsuede With Baking Soda',
      CONSTRAINT: 'With Baking Soda',
      Plan: [
        '1. Check the labels.',
        '2. Assemble your cleaning equipment.',
        '3. Vacuum the furniture.',
        '4. Make a baking soda paste.',
        '5. Test the furniture.',
        '6. Clean the furniture.',
        '7. Let the furniture dry.',
        '8. Brush the fabric.',
        '9. Keep your microsuede furniture clean.'
      ],
      'Similar Goals with Plans': [
        {
          'Specific Goal': 'Clean Microsuede Furniture',
          CONSTRAINT: 'Furniture',
          Plan: [
            '1. Check the labels.',
            '2. Assemble your cleaning equipment.',
            '3. Vacuum the furniture.',
            '4. Fill the spray bottle with your cleaner.',
            '5. Test the furniture.',
            '6. Clean the furniture.',
            '7. Let the furniture dry.',
            '8. Brush the fabric.',
            '9. Keep your microsuede furniture clean.'
          ]
        },
        {
          'Specific Goal': 'Clean Microsuede Fabrics',
          CONSTRAINT: 'Fabrics',
          Plan: ['1. Spot clean stains.', '2. Fill a sink with warm water.', '3. Dry the items.']
        },
        {
          'Specific Goal': 'Clean Microsuede Shoes',
          CONSTRAINT: 'Shoes',
          Plan: [
            '1. Brush off dirt.',
            '2. Spray the shoes with cleaner.',
            '3. Allow the shoes to air dry.'
          ]
        }
      ]
    }
  ].map((task) => ({
    ...task,
    steps: convertPlan(task.Plan),
    selection: [0, 0, 0],
    'Similar Goals with Plans': task['Similar Goals with Plans'].map((similarGoal) => ({
      goal: similarGoal['Specific Goal'],
      steps: convertPlan(task.Plan)
    }))
  }))
)

const eTasks = ref<{ selection: number[]; steps: Step[] }[]>()
const status = ref<string>('')

const mturkForm = ref<HTMLFormElement>()
const finalData = ref('')
const assignmentId = ref('')

const allowSubmit = computed(() => {
  if (status.value !== '' && !status.value.startsWith('Error')) return false
  return eTasks.value?.every((task) => {
    if (!task.selection.every((s) => s !== null)) return false
    return !(task.selection[2] === 1 && task.steps.every((step) => step.type === 0))
  })
})

const annotationIndex = ref<number | null>(null)
const certify1 = ref(false)
const certify2 = ref(false)

const submitAnnotation = async () => {
  const annotation = eTasks.value!.map((task) => {
    const ret: any = {
      selection: task.selection
    }
    if (ret.selection[2] === 1) {
      ret.steps = task.steps.map((step) => {
        const stepRet: any = {}
        stepRet.type = step.type
        if (stepRet.type === ErrorType.Missing) stepRet.missing = step.content
        if (step.type === ErrorType.Other) stepRet.error = (step as any).info
        return stepRet
      })
    }
    return ret
  })
  console.log(annotation)
  finalData.value = JSON.stringify(annotation)
  const urlParams = new URLSearchParams(window.location.search)
  assignmentId.value = urlParams.get('assignmentId')!
  status.value = 'Pending...'
  try {
    // const response = await axios.post(
    //   'https://hfkqoye7jttmbkpzavpe7mzuce0anbsz.lambda-url.us-east-2.on.aws/',
    //   {
    //     data: annotation,
    //     index: annotationIndex
    //   }
    // )
    await nextTick()
    mturkForm.value?.submit()
    status.value = 'Success!'
  } catch (e: any) {
    status.value = 'Error: ' + e.message
  }
}

onMounted(async () => {
  const response = await axios.post(
    'https://afazpkw56gfqbbqsepg3sim52y0bjgbk.lambda-url.us-east-2.on.aws/',
    'hello_fudan',
    {
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  )

  tasks.value = response.data.data.map((task: { [x: string]: any[]; Plan: string[] }) => ({
    ...task,
    steps: convertPlan(task.Plan),
    selection: [0, 0, 0],
    'Similar Goals with Plans': []
  }))

  annotationIndex.value = response.data.index
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="justify-center">
          <v-col
            cols="12"
            md="10"
            lg="8"
            xl="7"
          >
            <v-expansion-panels
              v-model="ePanelOpen"
              multiple
            >
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <span class="font-weight-bold mr-1">Instructions</span>(click to expand/collapse)
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p class="py-2">
                    Thanks for participating in this HIT!
                    <span class="text-red font-bold">
                      Please spend some time reading this instruction and the example section to
                      better understand our HIT!
                    </span>
                  </p>

                  <p class="py-2">
                    In this hit, you need to complete 20 data labeling tasks. In each task, you will
                    be presented a general goal about everyday activities (such as “make a cake”)
                    and a specific goal which inherits the general goal but is more specific and has
                    a reasonable <span class="text-red font-bold">CONSTRAINT</span> (such as “make a
                    chocolate cake”). You will answer 3 questions for each task.
                  </p>
                  <p class="py-2">
                    <span class="font-bold">Question 1</span> <br />
                    In Question 1, you need to assess whether the specific goal is reasonable. For
                    example, making a chocolate cake is a reasonable constraint of making a cake,
                    whereas making a lego cake is not reasonable.
                  </p>
                  <p class="py-2">
                    <span class="font-bold">Question 2</span> <br />
                    Then, you will read a plan of the specific goal with actionable steps (in the
                    cake’s example, the plan is the steps towards making a cake). Question 2 is to
                    check whether the plan
                    <span class="text-red font-bold">MEETS THE CONSTRAINT</span>. If the specific
                    goal is making a chocolate cake and the plan does not mention chocolate, then it
                    does not meet the constraint.
                  </p>
                  <p class="py-2">
                    <span class="font-bold">Question 3</span> <br />
                    In Question 3, you will assess whether the plan can indeed accomplish the given
                    goal. If the plan can not accomplish the given goal, you need to point out the
                    wrong steps and
                    <span class="text-red font-bold">SELECT THE ERROR TYPES</span>. A plan for
                    making chocolate cake might mention chocolate, but if its baking instructions
                    are wrong, then you need to reflect it in Question 3.
                  </p>
                  <div class="py-2">
                    <span class="font-bold">Notes:</span>
                    <ul class="list-disc pl-5">
                      <li>
                        A general goal involves
                        <span class="text-red font-bold">STEREOTYPICAL ACTIVITIES</span> such as
                        ``bake a cake'', while a specific goal can be multi-facet
                        <span class="text-red font-bold">WITH A REASONABLE CONSTRAINT</span>.
                        <ul
                          class="pl-5"
                          style="list-style-type: circle"
                        >
                          <li>
                            For example, a cake can be baked for different purposes (for a wedding
                            or a birthday party), with various tools (with a microwave or an oven)
                            or with different ingredients (chocolate or vanilla).
                          </li>
                        </ul>
                      </li>
                      <li>
                        If you think the specific goal is not reasonable, choose NO in Question 1,
                        but still proceed with Question 2 and 3 pretending that it is reasonable.
                        For example, making a LEGO cake is not reasonable, but you can still assess
                        whether the corresponding plan meets the constraint or not. Remember you can
                        always choose “I am not sure”.
                      </li>
                      <li>
                        You <span class="text-red font-bold">SHOULD NOT</span> ignore grammar and
                        spelling mistakes in the plan.
                      </li>
                      <li>
                        You can <span class="text-red font-bold">SEARCH GOOGLE</span> to help you
                        judge whether the plan can achieve the goal, especially if you are not sure
                        about the plan.
                      </li>
                    </ul>
                  </div>
                  <v-divider />
                  <h3 class="text-xl py-3 font-bold">Example of Error Types</h3>
                  <div class="flex justify-center flex-grow-1">
                    <div class="w-2/5 min-h-full mx-5 my-4 flex flex-col">
                      <div class="border px-3 flex-grow-1">
                        <p class="py-2">Specific Goal: Make A Vanilla Cake</p>
                        <div class="py-2">
                          Plan:
                          <ol
                            id="test"
                            class="list-decimal pl-5"
                          >
                            <li>Gather your ingredients.</li>
                            <li>
                              Preheat the oven to 325 °F (163 °C) and grease and flour a cake pan.
                            </li>
                            <li>Cream the butter and sugar.</li>
                            <li>Add the eggs and vanilla.</li>
                            <li>Stir in the cake flour.</li>
                            <li>Pour the batter into the pan.</li>
                            <li>Bake the cake for 1 hour 15 minutes.</li>
                          </ol>
                        </div>
                      </div>
                      <div class="px-3 mt-2 text-center font-bold">Golden Plan</div>
                    </div>
                    <div class="w-2/5 min-h-full mx-5 my-4 flex flex-col">
                      <div class="border px-3 flex-grow-1">
                        <p class="py-2">Specific Goal: Make A Vanilla Cake</p>
                        <div class="py-2">
                          Plan:
                          <ol class="list-decimal pl-5">
                            <li class="text-fuchsia-600 font-bold">
                              Preheat the oven to 325 °F (163 °C) and grease and flour a cake pan.
                            </li>
                            <li class="text-fuchsia-600 font-bold">Gather your ingredients.</li>
                            <li class="text-orange-500 font-bold">Buy your ingredients.</li>
                            <li class="text-red font-bold">
                              Cream the butter and
                              <span class="text-green-700 font-bold">salt</span>.
                            </li>
                            <li class="text-red font-bold">Stir in the cake flour.</li>
                            <li class="text-cyan-500 font-bold">Have a shower.</li>
                            <li>Pour the batter into the pan.</li>
                            <li>Bake the cake for 1 hour 15 minutes.</li>
                          </ol>
                        </div>
                      </div>
                      <div class="px-3 mt-2 text-center font-bold">Wrong Plan</div>
                    </div>
                  </div>
                  <table class="border table-auto w-full text-center">
                    <tr>
                      <th class="border w-2/5 bg-lime-100">Error Types</th>
                      <th class="border w-3/5 bg-lime-100">Explanation</th>
                    </tr>
                    <tr>
                      <td class="border">
                        <span class="text-fuchsia-600 font-bold">Wrong order</span>
                      </td>
                      <td class="border">Steps that are in the wrong order</td>
                    </tr>
                    <tr>
                      <td class="border">
                        <span class="text-orange-500 font-bold">Repeat steps</span>
                      </td>
                      <td class="border">Steps that are repeated in the plan</td>
                    </tr>
                    <tr>
                      <td class="border">
                        <span class="text-green-700 font-bold">Incoherent steps</span>
                      </td>
                      <td class="border">
                        Steps that are related to the goal, but are not coherent within the plan
                      </td>
                    </tr>
                    <tr>
                      <td class="border">
                        <span class="text-cyan-500 font-bold">Unrelated steps</span>
                      </td>
                      <td class="border">Steps that are not related to the goal</td>
                    </tr>
                    <tr>
                      <td class="border">
                        <span class="text-red font-bold">Missing steps</span>
                      </td>
                      <td class="border">Important steps that are missing</td>
                    </tr>
                    <tr>
                      <td class="border">
                        <p>Others: _________</p>
                        <p>(Describe what you think is wrong )</p>
                      </td>
                    </tr>
                  </table>
                  <div class="mt-3 mx-4">
                    <div
                      class="hover:bg-neutral-300 hover:bg-opacity-50 -m-1 p-1 transition cursor-pointer rounded-lg select-none transition"
                      @click="certify1 = !certify1"
                    >
                      <input
                        class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="checkbox"
                        :checked="certify1"
                      />
                      I certify that I have read and understand all the instructions.
                    </div>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <span class="font-weight-bold mr-1">Examples</span>(click to expand/collapse)
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div>
                    <div class="border bg-sky-600 text-white w-max px-4 py-1 mt-3">Example 1</div>
                  </div>
                  <ExampleTask
                    :steps="exampleSteps1"
                    :similar-goals="exampleSimilarGoals1"
                    :initial-choice="[0, 0, 0]"
                    general-goal="Make A Cake"
                    specific-goal="Make An Apple Cake"
                    constraint="Apple"
                    @instruction="ePanelOpen = 0"
                  />
                  <v-divider
                    class="my-4"
                    thickness="2"
                  />

                  <div>
                    <div class="border bg-sky-600 text-white w-max px-4 py-1 mt-3">Example 2</div>
                  </div>
                  <ExampleTask
                    :steps="exampleSteps2"
                    :similar-goals="exampleSimilarGoals2"
                    :initial-choice="[0, 1, 0]"
                    general-goal="Make Stuffed Pancakes"
                    specific-goal="Make Stuffed Pancakes with an electric mixer"
                    constraint="with an electric mixer"
                    @instruction="gotoInstruction"
                  />
                  <v-divider
                    class="my-4"
                    thickness="2"
                  />

                  <div>
                    <div class="border bg-sky-600 text-white w-max px-4 py-1 mt-3">Example 3</div>
                  </div>
                  <ExampleTask
                    :steps="exampleSteps3"
                    :similar-goals="exampleSimilarGoals3"
                    :initial-choice="[1, 0, 0]"
                    general-goal="Change Your Name"
                    specific-goal="Change Your Name because You Want to"
                    constraint="because You Want to"
                    @instruction="gotoInstruction"
                  />
                  <v-divider
                    class="my-4"
                    thickness="2"
                  />

                  <div>
                    <div class="border bg-sky-600 text-white w-max px-4 py-1 mt-3">Example 4</div>
                  </div>
                  <ExampleTask
                    :steps="exampleSteps4"
                    :similar-goals="exampleSimilarGoals4"
                    :initial-choice="[0, 0, 1]"
                    general-goal="Make A Cake"
                    specific-goal="Make A Vanilla Cake"
                    constraint="Vanilla"
                    @instruction="gotoInstruction"
                  />

                  <v-divider class="my-2" />

                  <template v-if="true">
                    <h2 class="text-lg py-2 font-bold">How to annotate:</h2>

                    <v-img
                      class="border-2 mx-10 my-2"
                      src="https://cdn.jsdelivr.net/gh/dest1n1s/static_files@master/assets/annotation6.png"
                    />

                    <v-img
                      class="border-2 mx-10 my-2"
                      src="https://cdn.jsdelivr.net/gh/dest1n1s/static_files@master/assets/annotation7.png"
                    />

                    <v-img
                      class="border-2 mx-10 my-2"
                      src="https://cdn.jsdelivr.net/gh/dest1n1s/static_files@master/assets/annotation8.png"
                    />

                    <v-img
                      class="border-2 mx-10 my-2"
                      src="https://cdn.jsdelivr.net/gh/dest1n1s/static_files@master/assets/annotation9.png"
                    />

                    <v-img
                      class="border-2 mx-10 my-2"
                      src="https://cdn.jsdelivr.net/gh/dest1n1s/static_files@master/assets/annotation10.png"
                    />
                  </template>

                  <div class="mt-3 mx-4">
                    <div
                      class="hover:bg-neutral-300 hover:bg-opacity-50 -m-1 p-1 transition cursor-pointer rounded-lg select-none transition"
                      @click="certify2 = !certify2"
                    >
                      <input
                        class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="checkbox"
                        :checked="certify2"
                      />
                      I certify that I have read and understand all the examples.
                    </div>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel
                v-if="annotationIndex !== null"
                :disabled="!(certify1 && certify2)"
              >
                <v-expansion-panel-title>
                  <span class="font-weight-bold mr-1">Tasks</span>(click to expand/collapse)
                  <span
                    v-if="!(certify1 && certify2)"
                    class="text-red font-bold ml-3"
                  >
                    Please read all the instructions and examples!
                  </span>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <template
                    v-for="(task, i) in tasks"
                    :key="i"
                  >
                    <div>
                      <div class="border bg-sky-600 text-white w-max px-4 py-1 mt-3">
                        Task {{ i + 1 }}
                      </div>
                    </div>
                    <ExampleTask
                      ref="eTasks"
                      :steps="task.steps"
                      :similar-goals="task['Similar Goals with Plans']"
                      :initial-choice="task['selection']"
                      :general-goal="task['General Goal']"
                      :specific-goal="task['Specific Goal']"
                      :constraint="task.CONSTRAINT"
                      @instruction="gotoInstruction"
                    />
                    <v-divider
                      v-if="i !== tasks.length - 1"
                      class="my-2"
                    />
                  </template>
                  <div class="mt-2 flex justify-center">
                    <v-btn
                      class="mx-5 font-bold"
                      :disabled="!allowSubmit"
                      @click="submitAnnotation"
                    >
                      SUBMIT
                    </v-btn>
                  </div>
                  <div class="mt-2 flex justify-center text-red">
                    {{ status }}
                  </div>
                  <form
                    id="mturk_form"
                    ref="mturkForm"
                    method="post"
                    action="https://workersandbox.mturk.com/mturk/externalSubmit"
                  >
                    <input
                      id="assignmentId"
                      v-model="assignmentId"
                      name="assignmentId"
                      type="hidden"
                    />
                    <input
                      id="data"
                      v-model="finalData"
                      name="data"
                      type="hidden"
                    />
                    <input
                      id="annotationIndex"
                      v-model="annotationIndex"
                      name="index"
                      type="hidden"
                    />
                  </form>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <div
                v-else
                class="mt-2 flex justify-center text-md"
              >
                Fetching Task Data...
              </div>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
<style>
.colorselector-widget {
  padding: 5px;
  border-bottom: 1px solid #e5e5e5;
}

.colorselector-widget button {
  outline: none;
  border: none;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.5;
  margin: 4px;
}

.colorselector-widget button.selected,
.colorselector-widget button:hover {
  opacity: 1;
}

.r6o-annotation.RED {
  color: red;
}

.r6o-annotation.GREEN {
  color: green;
}

.r6o-annotation.BLUE {
  color: blue;
}
</style>
