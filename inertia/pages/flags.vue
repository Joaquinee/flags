<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6"
  >
    <h1 class="text-4xl font-extrabold text-indigo-800 mb-8 text-center">
      Quiz des Drapeaux du Monde
    </h1>
    <div v-if="currentFlag" class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <div class="flex justify-center mb-6">
        <img
          :src="`https://flagsapi.com/${currentFlag.code}/flat/64.png`"
          alt="Drapeau"
          class="w-32 h-32 object-cover rounded-lg shadow-md"
        />
      </div>
      <p class="text-lg font-semibold text-center text-gray-700 mb-4">Quel est ce pays ?</p>
      <ul class="space-y-3">
        <li v-for="(option, index) in options" :key="index">
          <button
            @click="checkAnswer(option)"
            class="w-full py-3 px-4 rounded-lg text-lg font-medium transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="[
              answered
                ? option === currentFlag.country
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
            ]"
            :disabled="answered"
          >
            {{ option }}
          </button>
        </li>
      </ul>
      <div v-if="answered" class="mt-6 text-center">
        <p class="text-xl font-bold mb-4" :class="isCorrect ? 'text-green-600' : 'text-red-600'">
          {{ feedbackMessage }}
        </p>
        <button
          @click="nextQuestion"
          class="bg-indigo-600 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Question suivante
        </button>
      </div>
    </div>
    <div v-else class="text-center bg-white p-8 rounded-2xl shadow-xl">
      <h2 class="text-3xl font-bold text-indigo-800 mb-4">Félicitations !</h2>
      <p class="text-xl text-gray-700">Vous avez terminé le quiz des drapeaux.</p>
      <p class="text-lg text-gray-600 mt-2">Score final : {{ score }} / {{ totalQuestions }}</p>
      <button
        @click="restartQuiz"
        class="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-indigo-700 transition duration-300 ease-in-out"
      >
        Recommencer le quiz
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  countries: Object,
})

const countryEntries = Object.entries(props.countries).map(([code, country]) => ({
  code,
  ...country,
}))

const currentFlag = ref(null)
const options = ref([])
const answered = ref(false)
const isCorrect = ref(false)
const score = ref(0)
const totalQuestions = ref(0)

const feedbackMessage = computed(() => {
  if (isCorrect.value) {
    return 'Correct ! Bien joué !'
  } else {
    return `Incorrect. La bonne réponse était ${currentFlag.value.country}.`
  }
})

function getRandomCountries() {
  const shuffled = [...countryEntries].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 4)
}

function setNewFlag() {
  const randomCountries = getRandomCountries()
  currentFlag.value = randomCountries[Math.floor(Math.random() * randomCountries.length)]
  options.value = randomCountries.map((country) => country.country)
  answered.value = false
  totalQuestions.value++
}

function checkAnswer(selectedCountry) {
  if (!answered.value) {
    answered.value = true
    isCorrect.value = selectedCountry === currentFlag.value.country
    if (isCorrect.value) {
      score.value++
    }
  }
}

function nextQuestion() {
  if (totalQuestions.value < 10) {
    setNewFlag()
  } else {
    currentFlag.value = null
  }
}

function restartQuiz() {
  score.value = 0
  totalQuestions.value = 0
  setNewFlag()
}

setNewFlag()
</script>
