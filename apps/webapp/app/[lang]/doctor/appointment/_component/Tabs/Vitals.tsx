import React, { useState } from "react"
import { SectionWrapper } from "./common/SectionWrapper"
import { SectionTitle } from "./common/SectionTitle"
import VitalsModal from "./vitals/VitalsModal"
import { VitalCard } from "./vitals/VitalCard"
import { VitalGraph } from "./vitals/VitalGraph"
import { VitalsHistory } from "./vitals/VitalsHistory"
import NewButton from "@/components/common/new-button"
import {
  HeartPulse,
  Activity,
  Thermometer,
  Scale,
  Ruler,
  Gauge,
} from "lucide-react"

export function Vitals() {
  const [latest, setLatest] = useState({
    bloodPressure: "",
    pulseRate: "",
    temperature: "",
    weight: "",
    height: "",
    bmi: "",
    observations: "",
    recordedBy: "Nurse Sarah",
    recordedAt: new Date().toISOString(),
  })

  const [history, setHistory] = useState([
    {
      id: "sample-1",
      recordedAt: new Date().toISOString(),
      recordedBy: "Nurse Sarah",
      vitals: {
        bloodPressure: "150/90 mmHg",
        pulseRate: "95 bpm",
        temperature: "37.2°C",
        weight: "72 kg",
        height: "165 cm",
        bmi: "26.4",
      },
      observations:
        "Mild swelling observed in lower limbs. Patient reports occasional dizziness when standing. No medicine pain at the time of examination.",
    },
  ])

  const [showModal, setShowModal] = useState(false)

  const graphData = [
    { time: "10pm", bp: 120, pulse: 78, temperature: 98.4, oxygen: 98 },
    { time: "11pm", bp: 118, pulse: 76, temperature: 98.3, oxygen: 98 },
    { time: "12am", bp: 115, pulse: 74, temperature: 98.2, oxygen: 97 },
    { time: "1am", bp: 113, pulse: 72, temperature: 98.1, oxygen: 97 },
    { time: "2am", bp: 112, pulse: 71, temperature: 98.1, oxygen: 96 },
    { time: "3am", bp: 110, pulse: 70, temperature: 98.0, oxygen: 96 },
    { time: "4am", bp: 111, pulse: 72, temperature: 98.2, oxygen: 97 },
    { time: "5am", bp: 114, pulse: 75, temperature: 98.3, oxygen: 97 },
    { time: "6am", bp: 118, pulse: 80, temperature: 98.5, oxygen: 98 },
    { time: "7am", bp: 122, pulse: 84, temperature: 98.6, oxygen: 98 },
    { time: "8am", bp: 125, pulse: 88, temperature: 98.7, oxygen: 99 },
    { time: "9am", bp: 128, pulse: 92, temperature: 98.8, oxygen: 99 },
  ]

  interface VitalsForm {
    bloodPressure: string
    pulseRate?: string
    temperature?: string
    weight?: string
    height?: string
    bmi?: string
    observations?: string
  }

  function handleSave(form: VitalsForm) {
    const entry = {
      id: `e-${Date.now()}`,
      recordedAt: new Date().toISOString(),
      recordedBy: "You",
      vitals: {
        bloodPressure: form.bloodPressure,
        pulseRate: form.pulseRate || "",
        temperature: form.temperature || "",
        weight: form.weight || "",
        height: form.height || "",
        bmi: form.bmi || "",
      },
      observations: form.observations || "",
    }
    setHistory((h) => [entry, ...h])
    setLatest({
      ...entry.vitals,
      observations: entry.observations,
      recordedBy: entry.recordedBy,
      recordedAt: entry.recordedAt,
    })
    setShowModal(false)
  }

  return (
    <SectionWrapper
      header={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SectionTitle title="Vital" />
            <span className="px-2 py-1 text-xs bg-green-100 border border-green-200 text-green-700 rounded-md">
              ✓ Auto-saved
            </span>
          </div>
          <div className="flex items-center gap-4">
            <NewButton
              handleClick={() => setShowModal(true)}
              name="Add Vitals"
            />
          </div>
        </div>
      }
    >
      <div className="mt-3">
        <div className="text-gray-700 font-semibold mb-3">
          Vital Signs & Observations
        </div>
        <div className="grid grid-cols-3 gap-4">
          {/* <VitalCard label="Blood Pressure" value={latest.bloodPressure || "-----"} />
          <VitalCard label="Pulse Rate" value={latest.pulseRate || "-----"} />
          <VitalCard label="Temperature" value={latest.temperature || "-----"} />
          <VitalCard label="Weight" value={latest.weight || "-----"} />
          <VitalCard label="Height" value={latest.height || "-----"} />
          <VitalCard label="BMI" value={latest.bmi || "-----"} /> */}

          <VitalCard
            label="Blood Pressure"
            value={latest.bloodPressure}
            icon={<HeartPulse className="w-6 h-6 text-red-500" />}
          />

          <VitalCard
            label="Pulse Rate"
            value={latest.pulseRate}
            icon={<Activity className="w-6 h-6 text-blue-500" />}
          />

          <VitalCard
            label="Temperature"
            value={latest.temperature}
            icon={<Thermometer className="w-6 h-6 text-orange-500" />}
          />

          <VitalCard
            label="Weight"
            value={latest.weight}
            icon={<Scale className="w-6 h-6 text-green-500" />}
          />

          <VitalCard
            label="Height"
            value={latest.height}
            icon={<Ruler className="w-6 h-6 text-purple-500" />}
          />

          <VitalCard
            label="BMI"
            value={latest.bmi}
            icon={<Gauge className="w-6 h-6 text-pink-500" />}
          />
        </div>
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">
            Additional Observations
          </div>
          <div className="border rounded-xl p-3 text-gray-600">
            {latest.observations || "-----"}
          </div>
        </div>
        <div className="mt-6">
          <div className="text-lg font-semibold mb-3">Vital Graph</div>
          <VitalGraph />
        </div>
        <div className="mt-6">
          <div className="text-lg font-semibold mb-3">History</div>
          <VitalsHistory history={history} />
        </div>
      </div>
      {showModal && (
        <VitalsModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </SectionWrapper>
  )
}
