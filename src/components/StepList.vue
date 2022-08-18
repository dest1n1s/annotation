<script setup lang="ts">
import { ErrorType, Step } from '../types'
import { computed, reactive, Ref, ref, watch } from 'vue'

const props = defineProps<{ steps: Step[]; disabled: boolean }>()
const vSteps = reactive(props.steps)
let openMenu = ref(false)
const menu = ref()
const listItems: Ref<HTMLElement[] | undefined> = ref()
const selectedType: Ref<ErrorType> = ref(ErrorType.NoError)
const missingContent: Ref<string> = ref('')
const otherInfo: Ref<string> = ref('')

const getFontClass = (type: ErrorType) => {
  const classNames = ['font-bold']
  switch (type) {
    case ErrorType.WrongOrder:
      classNames.push('text-fuchsia-600')
      break
    case ErrorType.Repeat:
      classNames.push('text-orange-500')
      break
    case ErrorType.Incoherent:
      classNames.push('text-green-700')
      break
    case ErrorType.Unrelated:
      classNames.push('text-cyan-500')
      break
    case ErrorType.Missing:
      classNames.push('text-red')
      break
    case ErrorType.NoError:
      return []
  }
  return classNames
}
const getPointerClass = () => {
  return props.disabled
    ? ''
    : 'hover:bg-neutral-300 hover:bg-opacity-50 -m-1 p-1 transition cursor-pointer rounded-lg select-none transition'.split(
        ' '
      )
}
const getListItemClass = (type: ErrorType) => {
  return [...getFontClass(type), ...getPointerClass()]
}
const listClass = computed(() => {
  return props.disabled ? 'list-decimal pl-5' : ''
})
const selectedSteps = computed(() => vSteps.filter((v) => v.checked))
const setMenuPosition = (index: number) => {
  const listItem = listItems.value![index]

  function getOffset(el: HTMLElement) {
    const rect = el.getBoundingClientRect()
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    }
  }

  const top = getOffset(listItem).top
  menu.value!.$el.style.left = '270px'
  menu.value!.$el.style.top = index * listItem.scrollHeight + 80 + 'px'
}

const missingStepIndex = computed(() => {
  const s = vSteps.map((v, i) => ({ ...v, index: i })).filter((v) => v.checked)
  if (s.length === 2 && s[0].index === s[1].index - 1) return s[0].index + 1
  else return -1
})

const isMissingStepValid = computed(() => {
  return missingStepIndex.value !== -1
})

const isRepeatStepValid = computed(() => {
  return selectedSteps.value.length >= 2
})

const isAllValid = computed(() => {
  if (selectedType.value === ErrorType.Other) return otherInfo.value !== ''
  if (selectedType.value === ErrorType.Missing) return missingContent.value !== ''
  return true
})

const submitAnnotation = () => {
  if (selectedType.value !== ErrorType.Missing) {
    selectedSteps.value.forEach((v) => (v.type = selectedType.value))
    if (selectedType.value !== ErrorType.Other) {
      otherInfo.value = ''
    }
    selectedSteps.value.forEach((v) => (v.info = otherInfo.value))
  } else {
    vSteps.splice(missingStepIndex.value, 0, {
      content: missingContent.value,
      type: ErrorType.Missing,
      checked: false
    })
  }
  openMenu.value = false
  vSteps.forEach((v) => (v.checked = false))
  otherInfo.value = ''
  missingContent.value = ''
  selectedType.value = ErrorType.NoError
}

const cancelAnnotation = () => {
  openMenu.value = false
  vSteps.forEach((v) => (v.checked = false))
  otherInfo.value = ''
  missingContent.value = ''
  selectedType.value = ErrorType.NoError
}

const removeStep = (index: number) => {
  vSteps.splice(index, 1)
}

watch(selectedType, () => {
  if (!selectedType.value) selectedType.value = ErrorType.NoError
})
</script>

<template>
  <div class="relative">
    <ol :class="listClass">
      <li
        v-for="(v, i) in vSteps"
        ref="listItems"
        :key="i"
        :class="getListItemClass(v.type)"
        @click="
          () => {
            if (!disabled) {
              if (v.type !== ErrorType.Missing) {
                v.checked = !v.checked
                openMenu = true
                setMenuPosition(i)
              } else {
                removeStep(i)
              }
            }
          }
        "
      >
        <input
          v-show="!disabled && v.type !== ErrorType.Missing"
          id="flexCheckDefault"
          class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          :checked="v.checked"
        />
        <svg
          v-show="!disabled && v.type === ErrorType.Missing"
          class="inline-block -mt-1 -ml-1 z-50"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
        >
          <path
            d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z"
          />
        </svg>
        {{ v.content }}
      </li>
    </ol>
    <div>
      <v-card
        v-show="openMenu"
        ref="menu"
        class="menu"
      >
        <h2 class="text-md font-bold py-2">Selected Steps:</h2>
        <p
          v-for="(v, i) in selectedSteps"
          :key="i"
          class="text-sm py-1"
        >
          {{ v.content }}
        </p>
        <v-divider class="my-2" />
        <h2 class="text-md font-bold py-2">Select the error:</h2>
        <div class="flex justify-center py-2">
          <v-btn-toggle
            v-model="selectedType"
            color="deep-purple accent-3"
            group
            variant="outlined"
          >
            <v-btn :value="ErrorType.NoError"> No Error </v-btn>

            <v-btn :value="ErrorType.WrongOrder">
              Wrong<br />
              Order
            </v-btn>

            <v-btn
              :value="ErrorType.Repeat"
              :disabled="!isRepeatStepValid"
            >
              Repeat<br />
              Steps
            </v-btn>

            <v-btn :value="ErrorType.Incoherent">
              Incoherent <br />
              Steps
            </v-btn>

            <v-btn :value="ErrorType.Unrelated">
              Unrelated<br />
              Steps
            </v-btn>

            <v-btn
              :value="ErrorType.Missing"
              :disabled="!isMissingStepValid"
            >
              Missing<br />
              Steps
            </v-btn>
          </v-btn-toggle>
        </div>
        <div class="flex justify-center">
          <div class="border my-2 py-2 px-2">
            <p>A couple of notes:</p>
            <ul class="list-disc pl-5">
              <li>
                If you want to select "<span class="text-red font-bold">Repeat Steps</span>", you
                need to first select at least <span class="text-red font-bold">TWO</span> steps.
              </li>
              <li>
                If the step is missing, you need to select the
                <span class="text-red font-bold">TWO</span> steps
                <span class="text-red font-bold">BEFORE AND AFTER</span> the step you want to
                insert.
              </li>
              <li>
                If you made a mistake, you can first
                <span class="text-red font-bold">SELECT THE STEPS</span> you want to modify, then
                select "<span class="text-red font-bold">No Error</span>", and finally click
                <span class="text-red font-bold">CONFIRM</span>.
              </li>
            </ul>
          </div>
        </div>
        <v-divider class="my-2" />
        <h2
          class="text-md font-bold py-1"
          :class="selectedType !== ErrorType.Missing ? 'text-gray-200' : ''"
        >
          Write the Missing Step
        </h2>
        <div class="flex justify-center py-2 mx-7">
          <v-text-field
            v-model="missingContent"
            variant="underlined"
            hide-details
            placeholder="Write Something..."
            :disabled="selectedType !== ErrorType.Missing"
          ></v-text-field>
        </div>
        <v-divider class="my-2" />
        <div class="flex justify-center py-2 mx-7">
          <v-btn-toggle
            v-model="selectedType"
            color="deep-purple accent-3"
            group
            variant="outlined"
          >
            <v-btn :value="ErrorType.Other"> Others </v-btn>
          </v-btn-toggle>
          <v-text-field
            v-model="otherInfo"
            class="mx-5"
            variant="underlined"
            label="Describe what you think is wrong"
            hide-details
            :disabled="selectedType !== ErrorType.Other"
          ></v-text-field>
        </div>
        <v-divider class="my-2" />
        <div class="flex justify-center py-2">
          <v-btn
            class="mx-5 font-bold"
            :disabled="!isAllValid"
            @click="submitAnnotation"
          >
            CONFIRM
          </v-btn>
          <v-btn
            class="mx-5 font-bold"
            @click="cancelAnnotation"
          >
            CANCEL
          </v-btn>
        </div>
      </v-card>
    </div>
  </div>
</template>

<style lang="scss">
.v-card.menu {
  position: absolute;
  z-index: 50;
  width: 600px;
  height: auto;
  background-color: white;
  transition-property: top, left;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  border: 1px black;
  padding: 12px;
}

.menu .v-btn {
  display: inline-grid;
  font-weight: initial;
  letter-spacing: initial;
  line-height: initial;
  max-width: initial;
  text-decoration: initial;
  text-indent: initial;
  text-transform: initial;
}
.menu .v-btn.font-bold {
  font-weight: 700;
}
</style>
