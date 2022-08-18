<template>
  <div>
    <h2 class="text-lg py-2 font-bold">Step 1</h2>
    <div class="flex justify-center py-2">
      <div class="w-max border px-10 py-2">
        <p class="py-2">General Goal: {{ generalGoal }}</p>
        <p class="py-2 font-bold">Specific Goal: {{ specificGoal }}</p>
      </div>
    </div>

    <p class="py-2">
      Read the given goal. Does the
      <span class="text-red font-bold">Specific Goal</span> inherit the General Goal and contain a
      <span class="text-red font-bold">
        CONSTRAINT<span v-if="constraint"> ({{ constraint }})</span>
      </span>
      <span>?</span>
    </p>

    <div class="flex justify-center w-full">
      <v-item-group
        v-model="selection[0]"
        class="divide-y border w-2/5 rounded"
        selected-class="bg-lime-300"
      >
        <div class="text-center py-2 transition bg-neutral-400">Select an option</div>
        <v-item v-slot="{ selectedClass, toggle }">
          <div
            v-ripple
            class="text-center py-2 select-none cursor-pointer transition"
            :class="selectedClass"
            @click="toggle"
          >
            Yes
          </div>
        </v-item>
        <v-item v-slot="{ selectedClass, toggle }">
          <div
            v-ripple
            class="text-center py-2 select-none cursor-pointer transition"
            :class="selectedClass"
            @click="toggle"
          >
            No
          </div>
        </v-item>
        <v-item v-slot="{ selectedClass, toggle }">
          <div
            v-ripple
            class="text-center py-2 select-none cursor-pointer transition"
            :class="selectedClass"
            @click="toggle"
          >
            I am not sure
          </div>
        </v-item>
      </v-item-group>
    </div>

    <v-divider class="mt-4" />

    <h2 class="text-lg py-2 font-bold">Step 2</h2>

    <div class="flex justify-center">
      <div class="w-4/5 min-h-full mx-5 my-4 flex flex-col">
        <div class="border px-3 flex-grow-1">
          <p class="py-2">Specific Goal: {{ specificGoal }}</p>
          <div class="py-2">
            Plan:
            <StepList
              :steps="steps"
              disabled
            ></StepList>
          </div>
        </div>
      </div>
    </div>

    <p class="py-2">
      Read the plan. Does the Plan meet the
      <span class="text-red font-bold">CONSTRAINT</span> in the Specific Goal ?
    </p>

    <div class="flex justify-center w-full">
      <v-item-group
        v-model="selection[1]"
        class="divide-y border w-2/5 rounded"
        selected-class="bg-lime-300"
      >
        <div class="text-center py-2 transition bg-neutral-400">Select an option</div>
        <v-item v-slot="{ selectedClass, toggle }">
          <div
            v-ripple
            class="text-center py-2 select-none cursor-pointer transition"
            :class="selectedClass"
            @click="toggle"
          >
            Yes
          </div>
        </v-item>
        <v-item v-slot="{ selectedClass, toggle }">
          <div
            v-ripple
            class="text-center py-2 select-none cursor-pointer transition"
            :class="selectedClass"
            @click="toggle"
          >
            No
          </div>
        </v-item>
        <v-item v-slot="{ selectedClass, toggle }">
          <div
            v-ripple
            class="text-center py-2 select-none cursor-pointer transition"
            :class="selectedClass"
            @click="toggle"
          >
            I am not sure
          </div>
        </v-item>
      </v-item-group>
    </div>

    <v-divider class="mt-4" />

    <h2 class="text-lg py-2 font-bold">Step 3</h2>

    <p class="py-2">Read the plan. Can the plan accomplish the Specific Goal?</p>
    <p class="py-2">
      We show you below <span class="text-red font-bold">TWO SIMILAR GOALS WITH PLANS</span> to help
      you judge whether the plan can achieve the goal.
    </p>

    <v-expansion-panels class="mt-2 mb-4">
      <v-expansion-panel>
        <v-expansion-panel-title>
          <span class="font-weight-bold mr-1">Similar goals with plans</span>(click to
          expand/collapse)
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div
            v-for="(v, i) in similarGoals"
            :key="i"
            class="flex justify-center"
          >
            <div class="w-4/5 min-h-full mx-5 my-4 flex flex-col">
              <div class="border px-3 flex-grow-1">
                <p class="py-2">Specific Goal: {{ v.goal }}</p>
                <div class="py-2">
                  Plan:
                  <StepList
                    :steps="v.steps"
                    disabled
                  ></StepList>
                </div>
              </div>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <div class="flex justify-center w-full">
      <v-item-group
        v-model="selection[2]"
        class="divide-y border w-3/5 rounded"
        selected-class="bg-lime-300"
      >
        <div class="text-center py-2 transition bg-neutral-400">Select an option</div>
        <v-item v-slot="{ selectedClass, toggle }">
          <div
            v-ripple
            class="text-center py-2 select-none cursor-pointer transition"
            :class="selectedClass"
            @click="toggle"
          >
            Yes
          </div>
        </v-item>
        <v-item v-slot="{ selectedClass, toggle }">
          <div
            v-ripple
            class="text-center py-2 select-none cursor-pointer transition"
            :class="selectedClass"
            @click="toggle"
          >
            No
          </div>
        </v-item>
        <v-item v-slot="{ selectedClass, toggle }">
          <div
            v-ripple
            class="text-center py-2 select-none cursor-pointer transition"
            :class="selectedClass"
            @click="toggle"
          >
            I am not sure even if I have searched on google
          </div>
        </v-item>
      </v-item-group>
    </div>

    <p class="py-2">
      If you choice “NO” , please highlight the wrong steps and select the error types.
    </p>
    <p
      class="py-2 font-bold underline cursor-pointer"
      @click="$emit('instruction')"
    >
      Please refer to the instructions for error types.
    </p>

    <div
      v-if="selection[2] === 1"
      class="flex justify-center"
    >
      <div class="w-4/5 min-h-full mx-5 my-4 flex flex-col">
        <div class="border px-3 flex-grow-1">
          <p class="py-2">Specific Goal: {{ specificGoal }}</p>
          <div class="py-2">
            Plan:
            <StepList
              :steps="steps"
              :disabled="selection[2] !== 1"
            ></StepList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Step } from '../types'
import { reactive } from 'vue'
import StepList from './StepList.vue'

const props = defineProps<{
  steps: Step[]
  initialChoice: (number | null)[]
  generalGoal: string
  specificGoal: string
  similarGoals: {
    goal: string
    steps: Step[]
  }[]
  constraint?: string
}>()
const selection = reactive(props.initialChoice)
const steps = reactive(props.steps)
defineExpose({
  selection,
  steps
})

defineEmits(['instruction'])
</script>

<style lang="scss" scoped></style>
