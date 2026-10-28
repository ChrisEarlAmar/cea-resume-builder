import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import type { Certification, Education, Experience, Project, ResumeData, SkillGroup } from '../../types/resume'
import { formatDateRange, formatUrlLabel, toHttpUrl } from '../../utils/resumeHelpers'

interface PDFResumeDocumentProps {
  data: ResumeData
}

const mm = (value: number): number => value * 2.83465

const styles = StyleSheet.create({
  page: {
    paddingTop: mm(15),
    paddingRight: mm(16),
    paddingBottom: mm(13),
    paddingLeft: mm(16),
    color: '#111111',
    fontFamily: 'Helvetica',
    fontSize: 10.1,
    lineHeight: 1.45,
  },
  header: {
    marginBottom: mm(4.2),
    paddingBottom: mm(4),
    borderBottomWidth: 1,
    borderBottomColor: '#111111',
  },
  name: {
    marginBottom: mm(1.6),
    fontFamily: 'Helvetica-Bold',
    fontSize: 23,
    lineHeight: 1,
  },
  title: {
    marginBottom: mm(1.8),
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    lineHeight: 1.25,
  },
  contact: {
    marginBottom: mm(1),
    fontSize: 9.6,
    lineHeight: 1.4,
  },
  link: {
    marginBottom: mm(0.7),
    color: '#111111',
    fontSize: 9.6,
    lineHeight: 1.35,
    textDecoration: 'underline',
  },
  section: {
    marginTop: mm(4.2),
  },
  sectionTitle: {
    marginBottom: mm(1.6),
    fontFamily: 'Helvetica-Bold',
    fontSize: 10.4,
    lineHeight: 1.2,
  },
  entry: {
    marginTop: mm(2.5),
  },
  firstEntry: {
    marginTop: 0,
  },
  entryTitle: {
    marginBottom: mm(0.8),
    fontFamily: 'Helvetica-Bold',
    fontSize: 10.2,
    lineHeight: 1.25,
  },
  meta: {
    marginBottom: mm(0.9),
    color: '#333333',
    fontSize: 9.7,
    lineHeight: 1.35,
  },
  body: {
    marginBottom: mm(0.9),
    fontSize: 9.7,
    lineHeight: 1.42,
  },
  highlights: {
    marginTop: mm(0.3),
  },
  highlight: {
    flexDirection: 'row',
    marginBottom: mm(0.7),
  },
  marker: {
    width: mm(4),
    fontSize: 9.7,
    lineHeight: 1.42,
  },
  highlightText: {
    flex: 1,
    fontSize: 9.7,
    lineHeight: 1.42,
  },
  skillList: {
    gap: mm(1.1),
  },
  label: {
    fontFamily: 'Helvetica-Bold',
  },
})

const hasExperienceContent = (item: Experience): boolean => Boolean(
  item.position.trim() || item.company.trim() || item.location.trim() || item.highlights.some((highlight) => highlight.trim()),
)

const hasEducationContent = (item: Education): boolean => Boolean(
  item.institution.trim() || item.degree.trim() || item.field.trim() || item.description.trim(),
)

const hasProjectContent = (item: Project): boolean => Boolean(
  item.name.trim() || item.description.trim() || item.technologies.some((technology) => technology.trim()),
)

const hasCertificationContent = (item: Certification): boolean => Boolean(
  item.name.trim() || item.issuer.trim() || item.date.trim(),
)

const PDFSection = ({ title, children }: { title: string, children: ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
)

const PDFHeader = ({ data }: { data: ResumeData }) => {
  const contactDetails = [data.personal.email, data.personal.phone, data.personal.location].filter(Boolean)
  const links = [data.personal.linkedin, data.personal.github, data.personal.website].filter(Boolean)

  return (
    <View style={styles.header}>
      {data.personal.name ? <Text style={styles.name}>{data.personal.name}</Text> : null}
      {data.personal.title ? <Text style={styles.title}>{data.personal.title}</Text> : null}
      {contactDetails.length > 0 ? <Text style={styles.contact}>{contactDetails.join(' | ')}</Text> : null}
      {links.map((value) => {
        const url = toHttpUrl(value)
        const label = formatUrlLabel(value)
        return url ? <Link key={value} src={url} style={styles.link}>{label}</Link> : <Text key={value} style={styles.link}>{label}</Text>
      })}
    </View>
  )
}

const PDFExperience = ({ items }: { items: Experience[] }) => {
  const experience = items.filter(hasExperienceContent)
  if (experience.length === 0) return null

  return (
    <PDFSection title="Experience">
      {experience.map((item, itemIndex) => {
        const meta = [item.company, item.location, formatDateRange(item.startDate, item.endDate, item.current)].filter(Boolean)
        const highlights = item.highlights.filter((highlight) => highlight.trim())
        return (
          <View key={item.id} style={[styles.entry, itemIndex === 0 ? styles.firstEntry : undefined]} wrap={false}>
            {item.position ? <Text style={styles.entryTitle}>{item.position}</Text> : null}
            {meta.length > 0 ? <Text style={styles.meta}>{meta.join(' | ')}</Text> : null}
            {highlights.length > 0 ? (
              <View style={styles.highlights}>
                {highlights.map((highlight, index) => (
                  <View style={styles.highlight} key={`${item.id}-${index}`}>
                    <Text style={styles.marker}>-</Text>
                    <Text style={styles.highlightText}>{highlight}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        )
      })}
    </PDFSection>
  )
}

const PDFEducation = ({ items }: { items: Education[] }) => {
  const education = items.filter(hasEducationContent)
  if (education.length === 0) return null

  return (
    <PDFSection title="Education">
      {education.map((item, itemIndex) => {
        const degree = [item.degree, item.field].filter(Boolean).join(', ')
        const meta = [item.institution, formatDateRange(item.startDate, item.endDate)].filter(Boolean)
        return (
          <View key={item.id} style={[styles.entry, itemIndex === 0 ? styles.firstEntry : undefined]} wrap={false}>
            {degree ? <Text style={styles.entryTitle}>{degree}</Text> : null}
            {meta.length > 0 ? <Text style={styles.meta}>{meta.join(' | ')}</Text> : null}
            {item.description ? <Text style={styles.body}>{item.description}</Text> : null}
          </View>
        )
      })}
    </PDFSection>
  )
}

const PDFSkills = ({ items }: { items: SkillGroup[] }) => {
  const groups = items
    .map((group) => ({ ...group, skills: group.skills.filter((skill) => skill.trim()) }))
    .filter((group) => group.skills.length > 0)
  if (groups.length === 0) return null

  return (
    <PDFSection title="Skills">
      <View style={styles.skillList}>
        {groups.map((group) => (
          <Text key={group.id} style={styles.body}>
            {group.name ? <Text style={styles.label}>{group.name}: </Text> : null}
            {group.skills.join(', ')}
          </Text>
        ))}
      </View>
    </PDFSection>
  )
}

const PDFProjects = ({ items }: { items: Project[] }) => {
  const projects = items.filter(hasProjectContent)
  if (projects.length === 0) return null

  return (
    <PDFSection title="Projects">
      {projects.map((project, itemIndex) => {
        const link = toHttpUrl(project.link)
        const technologies = project.technologies.filter((technology) => technology.trim())
        return (
          <View key={project.id} style={[styles.entry, itemIndex === 0 ? styles.firstEntry : undefined]} wrap={false}>
            {project.name ? <Text style={styles.entryTitle}>{project.name}</Text> : null}
            {link ? <Link src={link} style={styles.link}>{formatUrlLabel(project.link)}</Link> : null}
            {project.description ? <Text style={styles.body}>{project.description}</Text> : null}
            {technologies.length > 0 ? <Text style={styles.body}><Text style={styles.label}>Technologies: </Text>{technologies.join(', ')}</Text> : null}
          </View>
        )
      })}
    </PDFSection>
  )
}

const PDFCertifications = ({ items }: { items: Certification[] }) => {
  const certifications = items.filter(hasCertificationContent)
  if (certifications.length === 0) return null

  return (
    <PDFSection title="Certifications">
      {certifications.map((item, itemIndex) => {
        const meta = [item.issuer, item.date].filter(Boolean)
        const url = toHttpUrl(item.url)
        return (
          <View key={item.id} style={[styles.entry, itemIndex === 0 ? styles.firstEntry : undefined]} wrap={false}>
            {item.name ? <Text style={styles.entryTitle}>{item.name}</Text> : null}
            {meta.length > 0 ? <Text style={styles.meta}>{meta.join(' | ')}</Text> : null}
            {url ? <Link src={url} style={styles.link}>{formatUrlLabel(item.url)}</Link> : null}
          </View>
        )
      })}
    </PDFSection>
  )
}

export const PDFResumeDocument = ({ data }: PDFResumeDocumentProps) => (
  <Document title={`${data.personal.name || 'Resume'} - ATS-friendly resume`} author={data.personal.name || undefined}>
    <Page size="A4" style={styles.page} wrap>
      <PDFHeader data={data} />
      {data.summary.trim() ? <PDFSection title="Professional Summary"><Text style={styles.body}>{data.summary}</Text></PDFSection> : null}
      <PDFExperience items={data.experience} />
      <PDFEducation items={data.education} />
      <PDFSkills items={data.skillGroups} />
      <PDFProjects items={data.projects} />
      <PDFCertifications items={data.certifications} />
    </Page>
  </Document>
)
