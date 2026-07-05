"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Text,
  Sparkles,
  Stars,
  RoundedBox,
  Sphere,
  Torus,
  Cylinder,
  Box,
  PerspectiveCamera
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

// Types
type RoomSection = "hero" | "about" | "projects" | "skills" | "peakcraft" | "contact";

// Project data
const projects = [
  { name: "Peak Craft Website", tech: ["Next.js", "React", "Tailwind"], color: "#62C2FF" },
  { name: "Portfolio v3", tech: ["Next.js", "TypeScript", "Three.js"], color: "#FF6B6B" },
  { name: "Community Platform", tech: ["React", "Node.js", "MongoDB"], color: "#4ECDC4" },
  { name: "Design System", tech: ["Figma", "React", "Storybook"], color: "#FFE66D" },
];

// Skills as 3D objects
const skills = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#FFFFFF" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Linux", color: "#FCC624" },
  { name: "Node.js", color: "#339933" },
  { name: "Figma", color: "#F24E1E" },
];

// Camera controller that moves based on scroll
function CameraController({ currentSection }: { currentSection: RoomSection }) {
  const { camera } = useThree();

  useFrame(() => {
    const targetZ = currentSection === "hero" ? 8 :
                    currentSection === "about" ? -12 :
                    currentSection === "projects" ? -30 :
                    currentSection === "skills" ? -50 :
                    currentSection === "peakcraft" ? -70 : -90;

    // Smooth camera movement
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);
  });

  return null;
}

// Hero Room - Floating terminal/workspace aesthetic
function HeroRoom() {
  return (
    <group position={[0, 0, 0]}>
      {/* Floating code editor representation */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <RoundedBox args={[4, 2.5, 0.2]} radius={0.1} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        {/* Code lines */}
        <Text position={[-1.5, 0.5, 0.15]} fontSize={0.15} color="#62C2FF" anchorX="left">
          {'<HelloWorld />'}
        </Text>
        <Text position={[-1.5, 0.2, 0.15]} fontSize={0.1} color="#888888" anchorX="left">
          {'const developer = {'}
        </Text>
        <Text position={[-1.5, 0, 0.15]} fontSize={0.1} color="#888888" anchorX="left">
          {'  name: "Jibril",'}
        </Text>
        <Text position={[-1.5, -0.2, 0.15]} fontSize={0.1} color="#888888" anchorX="left">
          {'  passion: "building"'}
        </Text>
        <Text position={[-1.5, -0.4, 0.15]} fontSize={0.1} color="#888888" anchorX="left">
          {'};'}
        </Text>
      </Float>

      {/* Floating terminal window */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3} position={[3, 1, -1]}>
        <RoundedBox args={[2, 1.5, 0.1]} radius={0.05}>
          <meshStandardMaterial color="#0d0d0d" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        {/* Terminal dots */}
        <Sphere args={[0.08]} position={[-0.85, 0.6, 0.06]}>
          <meshStandardMaterial color="#FF5F56" />
        </Sphere>
        <Sphere args={[0.08]} position={[-0.65, 0.6, 0.06]}>
          <meshStandardMaterial color="#FFBD2E" />
        </Sphere>
        <Sphere args={[0.08]} position={[-0.45, 0.6, 0.06]}>
          <meshStandardMaterial color="#27C93F" />
        </Sphere>
        <Text position={[-0.8, 0.3, 0.06]} fontSize={0.08} color="#62C2FF">
          {`$ whoami`}
        </Text>
        <Text position={[-0.8, 0.1, 0.06]} fontSize={0.06} color="#888888">
          jibril@portfolio
        </Text>
      </Float>

      {/* Profile card floating */}
      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.4} position={[-3, 0.5, -1]}>
        <RoundedBox args={[1.8, 2.2, 0.1]} radius={0.15}>
          <meshStandardMaterial
            color="#62C2FF"
            metalness={0.6}
            roughness={0.2}
            transparent
            opacity={0.8}
          />
        </RoundedBox>
      </Float>

      {/* Sparkles around hero */}
      <Sparkles count={100} scale={10} size={2} speed={0.3} color="#62C2FF" />

      {/* Introduction text in 3D space */}
      <Text
        position={[0, 2.5, -2]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Jibril Nuredin
      </Text>
      <Text
        position={[0, 2, -2]}
        fontSize={0.2}
        color="#62C2FF"
        anchorX="center"
        anchorY="middle"
      >
        Building Technology, Communities & Digital Experiences
      </Text>
    </group>
  );
}

// About Room - Spatial representation
function AboutRoom() {
  return (
    <group position={[0, 0, -15]}>
      {/* Central timeline helix */}
      <group position={[0, 0, 0]}>
        {[
          { year: "2021", label: "The Beginning", pos: [-2, 0, 0] },
          { year: "2022", label: "First Projects", pos: [0, 0, 0] },
          { year: "2023", label: "Peak Craft", pos: [2, 0, 0] },
        ].map((item, i) => (
          <Float key={item.year} speed={1 + i * 0.2} position={item.pos as [number, number, number]}>
            <Torus args={[0.3, 0.05, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial
                color={i === 0 ? "#62C2FF" : i === 1 ? "#4ECDC4" : "#FFE66D"}
                emissive={i === 0 ? "#62C2FF" : i === 1 ? "#4ECDC4" : "#FFE66D"}
                emissiveIntensity={0.5}
              />
            </Torus>
            <Text position={[0, 0.5, 0]} fontSize={0.15} color="#ffffff">
              {item.year}
            </Text>
            <Text position={[0, -0.5, 0]} fontSize={0.1} color="#888888">
              {item.label}
            </Text>
          </Float>
        ))}
        {/* Connecting line */}
        <Cylinder args={[0.02, 0.02, 6, 8]} rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#333333" />
        </Cylinder>
      </group>

      {/* Info cards */}
      <Float speed={2} position={[-3, 1, 1]}>
        <RoundedBox args={[1.5, 1, 0.1]} radius={0.1}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        <Text position={[0, 0.2, 0.1]} fontSize={0.12} color="#62C2FF">
          Education
        </Text>
        <Text position={[0, -0.1, 0.1]} fontSize={0.08} color="#888888">
          Information Systems
        </Text>
        <Text position={[0, -0.25, 0.1]} fontSize={0.06} color="#666666">
          Hawassa University
        </Text>
      </Float>

      <Float speed={1.5} position={[3, -1, 1]}>
        <RoundedBox args={[1.5, 1, 0.1]} radius={0.1}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        <Text position={[0, 0.2, 0.1]} fontSize={0.12} color="#FFE66D">
          Role
        </Text>
        <Text position={[0, -0.1, 0.1]} fontSize={0.08} color="#888888">
          Head of PR
        </Text>
        <Text position={[0, -0.25, 0.1]} fontSize={0.06} color="#666666">
          Peak Craft
        </Text>
      </Float>

      <Sparkles count={50} scale={8} size={1.5} speed={0.2} color="#4ECDC4" />
    </group>
  );
}

// Projects Room - Interactive 3D project cards
function ProjectsRoom() {
  return (
    <group position={[0, 0, -35]}>
      {/* Project showcase - floating cubes that can be clicked */}
      {projects.map((project, i) => (
        <Float
          key={project.name}
          speed={1.5 + i * 0.2}
          position={[(i - 1.5) * 3, 0, 0]}
        >
          <RoundedBox
            args={[2, 2, 0.3]}
            radius={0.15}
            onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
            onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
          >
            <meshStandardMaterial
              color={project.color}
              metalness={0.6}
              roughness={0.2}
              emissive={project.color}
              emissiveIntensity={0.2}
            />
          </RoundedBox>
          {/* Project name */}
          <Text position={[0, 0, 0.2]} fontSize={0.15} color="#ffffff" anchorX="center">
            {project.name}
          </Text>
          {/* Tech stack */}
          <Text position={[0, -0.5, 0.2]} fontSize={0.08} color="#888888" anchorX="center">
            {project.tech.join(" • ")}
          </Text>
        </Float>
      ))}

      {/* Decorative floating shapes */}
      {[-6, 6].map((x, i) => (
        <Float key={i} speed={2 + i} position={[x, 1, -2]}>
          <Torus args={[0.5, 0.1, 16, 32]}>
            <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
          </Torus>
        </Float>
      ))}

      <Text position={[0, 2, 0]} fontSize={0.3} color="#ffffff">
        Projects
      </Text>

      <Sparkles count={80} scale={12} size={2} speed={0.3} color="#FF6B6B" />
    </group>
  );
}

// Skills Room - Tool workspace
function SkillsRoom() {
  return (
    <group position={[0, 0, -55]}>
      {/* Skills as floating geometric shapes */}
      {skills.map((skill, i) => (
        <Float
          key={skill.name}
          speed={1 + i * 0.15}
          position={[(i % 3 - 1) * 2.5, Math.floor(i / 3) * 2 - 1, 0]}
        >
          {i % 3 === 0 && (
            <Box args={[0.8, 0.8, 0.8]}>
              <meshStandardMaterial color={skill.color} metalness={0.7} roughness={0.2} />
            </Box>
          )}
          {i % 3 === 1 && (
            <Sphere args={[0.5, 32, 32]}>
              <meshStandardMaterial color={skill.color} metalness={0.7} roughness={0.2} />
            </Sphere>
          )}
          {i % 3 === 2 && (
            <Torus args={[0.4, 0.15, 16, 32]}>
              <meshStandardMaterial color={skill.color} metalness={0.7} roughness={0.2} />
            </Torus>
          )}
          <Text position={[0, -0.7, 0]} fontSize={0.15} color="#ffffff">
            {skill.name}
          </Text>
        </Float>
      ))}

      {/* Linux terminal representation */}
      <Float speed={1.2} position={[0, -2.5, 1]}>
        <RoundedBox args={[3, 1, 0.1]} radius={0.05}>
          <meshStandardMaterial color="#0d0d0d" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        <Text position={[-1.3, 0.2, 0.1]} fontSize={0.1} color="#FCC624">
          $ uname -a
        </Text>
        <Text position={[-1.3, -0.1, 0.1]} fontSize={0.08} color="#888888">
          Linux jibril-workspace
        </Text>
        <Text position={[-1.3, -0.3, 0.1]} fontSize={0.08} color="#FCC624">
          $ ./build-awesome.sh
        </Text>
      </Float>

      <Text position={[0, 2.5, 0]} fontSize={0.3} color="#ffffff">
        Skills & Tools
      </Text>
    </group>
  );
}

// Peak Craft Room - Community/Leadership
function PeakCraftRoom() {
  return (
    <group position={[0, 0, -75]}>
      {/* Community representation - connected nodes */}
      <group position={[0, 0, 0]}>
        {/* Central core */}
        <Sphere args={[0.8, 32, 32]}>
          <meshStandardMaterial
            color="#62C2FF"
            emissive="#62C2FF"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>

        {/* Orbiting community members */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i / 5) * Math.PI * 2;
          const radius = 2.5;
          return (
            <Float key={i} speed={1.5 + i * 0.2}>
              <group position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.5, 0]}>
                <Sphere args={[0.3, 16, 16]}>
                  <meshStandardMaterial
                    color={i < 2 ? "#4ECDC4" : i < 4 ? "#FFE66D" : "#FF6B6B"}
                    metalness={0.6}
                    roughness={0.3}
                  />
                </Sphere>
              </group>
              {/* Connection line */}
              <Cylinder args={[0.02, 0.02, radius, 8]} rotation={[0, 0, angle]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#333333" transparent opacity={0.5} />
              </Cylinder>
            </Float>
          );
        })}
      </group>

      {/* Achievement cards */}
      <Float speed={1.8} position={[-3, 0, 1]}>
        <RoundedBox args={[2, 1.5, 0.1]} radius={0.1}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        <Text position={[0, 0.3, 0.1]} fontSize={0.15} color="#FFE66D">
          PR Lead
        </Text>
        <Text position={[0, 0, 0.1]} fontSize={0.08} color="#888888">
          Peak Craft
        </Text>
        <Text position={[0, -0.3, 0.1]} fontSize={0.06} color="#666666">
          Building communities
        </Text>
      </Float>

      <Float speed={1.5} position={[3, 0, 1]}>
        <RoundedBox args={[2, 1.5, 0.1]} radius={0.1}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        <Text position={[0, 0.3, 0.1]} fontSize={0.15} color="#4ECDC4">
          Impact
        </Text>
        <Text position={[0, 0, 0.1]} fontSize={0.08} color="#888888">
          1000+ members
        </Text>
        <Text position={[0, -0.3, 0.1]} fontSize={0.06} color="#666666">
          50+ events
        </Text>
      </Float>

      <Text position={[0, 2.5, 0]} fontSize={0.3} color="#ffffff">
        Peak Craft
      </Text>
    </group>
  );
}

// Contact Room
function ContactRoom() {
  return (
    <group position={[0, 0, -95]}>
      {/* Floating contact card */}
      <Float speed={2}>
        <RoundedBox args={[3, 2, 0.2]} radius={0.2}>
          <meshStandardMaterial
            color="#62C2FF"
            emissive="#62C2FF"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>
        <Text position={[0, 0.3, 0.2]} fontSize={0.25} color="#ffffff">
          Get In Touch
        </Text>
        <Text position={[0, -0.2, 0.2]} fontSize={0.12} color="#888888">
          jibrilnuredin@gmail.com
        </Text>
      </Float>

      {/* Social links as floating icons */}
      {[
        { label: "GitHub", pos: [-2, -2, 0] as [number, number, number] },
        { label: "LinkedIn", pos: [0, -2, 0] as [number, number, number] },
        { label: "Twitter", pos: [2, -2, 0] as [number, number, number] },
      ].map((social, i) => (
        <Float key={social.label} speed={1.5 + i * 0.2} position={social.pos}>
          <Cylinder args={[0.3, 0.3, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
          </Cylinder>
          <Text position={[0, -0.5, 0]} fontSize={0.1} color="#ffffff">
            {social.label}
          </Text>
        </Float>
      ))}

      <Sparkles count={60} scale={10} size={2} speed={0.4} color="#62C2FF" />
    </group>
  );
}

// Main 3D Scene
function Scene({ currentSection }: { currentSection: RoomSection }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <CameraController currentSection={currentSection} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#62C2FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ECDC4" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#ffffff" />

      {/* Environment */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
      <fog attach="fog" args={['#07080d', 5, 50]} />

      {/* Rooms */}
      <HeroRoom />
      <AboutRoom />
      <ProjectsRoom />
      <SkillsRoom />
      <PeakCraftRoom />
      <ContactRoom />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.001, 0.001]}
        />
      </EffectComposer>
    </>
  );
}

// Loading fallback
function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#62C2FF" wireframe />
    </mesh>
  );
}

// Main 3D Portfolio Component
export function Portfolio3D() {
  const [currentSection, setCurrentSection] = useState<RoomSection>("hero");
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Determine current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const section = Math.floor(scrollPos / windowHeight);

      const sections: RoomSection[] = ["hero", "about", "projects", "skills", "peakcraft", "contact"];
      setCurrentSection(sections[Math.min(section, sections.length - 1)]);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fallback for mobile/low-performance devices
  const [isLowPerf, setIsLowPerf] = useState(false);

  useEffect(() => {
    // Check for low-end devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
    setIsLowPerf(isMobile || isLowMemory);
  }, []);

  if (isLowPerf) {
    return null; // Will render 2D fallback instead
  }

  return (
    <div ref={scrollRef} className="fixed inset-0">
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<Loader />}>
          <Scene currentSection={currentSection} />
        </Suspense>
      </Canvas>
    </div>
  );
}
