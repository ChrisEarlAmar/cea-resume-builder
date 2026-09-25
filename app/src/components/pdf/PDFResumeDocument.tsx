import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'
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
    paddingBottom: mm(12),
    paddingLeft: mm(16),
    color: '#111111',
    fontFamily: 'Helvetica',
    fontSize: 10.1,
    lineHeight: 1.52,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: mm(6),
  },
  identity: {
    flexGrow: 1,
    paddingRight: mm(10),
  },
  name: {
    marginBottom: mm(3),
    fontFamily: 'Helvetica-Bold',
    fontSize: 26,
    lineHeight: 0.98,
  },
  title: {
    marginBottom: mm(4.5),
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.2,
    letterSpacing: 1.3,
    lineHeight: 1.2,
    textTransform: 'uppercase',
  },
  rule: {
    width: mm(42),
    height: 1.2,
    backgroundColor: '#111111',
  },
  contact: {
    width: mm(60),
    color: '#111111',
    fontSize: 8.5,
    lineHeight: 1.55,
    textAlign: 'right',
  },
  contactLink: {
    color: '#111111',
    textDecoration: 'underline',
  },
  section: {
    flexDirection: 'row',
    marginTop: mm(5),
  },
  firstSection: {
    marginTop: 0,
  },
  sectionLabel: {
    width: mm(29),
    marginRight: mm(7),
    fontFamily: 'Helvetica-Bold',
    fontSize: 8.2,
    letterSpacing: 1.3,
    lineHeight: 1.2,
    textTransform: 'uppercase',
  },
  sectionContent: {
    flex: 1,
  },
  summary: {
    fontSize: 10.1,
    lineHeight: 1.52,
  },
  entries: {
    gap: mm(3.8),
  },
  entry: {
    flexDirection: 'row',
  },
  rail: {
    width: mm(26),
    marginRight: mm(5),
    color: '#3e3e3e',
    fontFamily: 'Helvetica-Bold',
    fontSize: 8.2,
    letterSpacing: 0.45,
    lineHeight: 1.32,
    textTransform: 'uppercase',
  },
  entryBody: {
    flex: 1,
  },
  entryTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  entryTitle: {
    marginBottom: mm(1.3),
    fontFamily: 'Helvetica-Bold',
    fontSize: 10.8,
    lineHeight: 1.25,
  },
  entryMeta: {
    marginBottom: mm(2),
    color: '#454545',
    fontSize: 9.3,
    lineHeight: 1.35,
  },
  description: {
    fontSize: 8.9,
    lineHeight: 1.45,
  },
  highlights: {
    gap: mm(1.2),
  },
  highlight: {
    flexDirection: 'row',
  },
  marker: {
    width: mm(4),
    fontSize: 8.9,
    lineHeight: 1.45,
  },
  highlightText: {
    flex: 1,
    fontSize: 8.9,
    lineHeight: 1.45,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: mm(4),
  },
  skillGroup: {
    width: '50%',
    paddingRight: mm(7),
  },
  skillTitle: {
    marginBottom: mm(1.1),
    fontFamily: 'Helvetica-Bold',
    fontSize: 8.5,
    lineHeight: 1.32,
  },
  skillList: {
    fontSize: 8.8,
    lineHeight: 1.42,
  },
  stack: {
    marginTop: mm(2.1),
    fontSize: 8.6,
    lineHeight: 1.42,
  },
  stackLabel: {
    fontFamily: 'Helvetica-Bold',
  },
  inlineLink: {
    marginLeft: mm(2.5),
    color: '#454545',
    fontSize: 7.8,
    textDecoration: 'underline',
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

const formatPdfDateRange = (startDate: string, endDate: string, current = false): string => {
  const range = formatDateRange(startDate, endDate, current)
  return range.length > 13 ? range.replace(' - ', '\n') : range
}

const keepEntryTogether = (parts: string[], limit = 850): boolean =>
  parts.join(' ').length <= limit

interface SectionProps {
  label: string
  children: React.ReactNode
  first?: boolean
}

const PDFSection = ({ label, children, first = false }: SectionProps) => (
  <View style={[styles.section, first ? styles.firstSection : undefined]}>
    <Text style={styles.sectionLabel}>{label}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
)

const PDFHeader = ({ data }: { data: ResumeData }) => {
  const contactDetails = [data.personal.email, data.personal.phone, data.personal.location].filter(Boolean)
  const links = [data.personal.linkedin, data.personal.github, data.personal.website].filter(Boolean)
  return (
    <View style={styles.header}>
      <View style={styles.identity}>
        {data.personal.name ? <Text style={styles.name}>{data.personal.name}</Text> : null}
        {data.personal.title ? <Text style={styles.title}>{data.personal.title}</Text> : null}
        <View style={styles.rule} />
      </View>
      {(contactDetails.length > 0 || links.length > 0) ? (
        <View style={styles.contact}>
          {contactDetails.map((detail) => <Text key={detail}>{detail}</Text>)}
          {links.map((value) => {
            const url = toHttpUrl(value)
            const label = formatUrlLabel(value)
            return url ? <Link key={value} src={url} style={styles.contactLink}>{label}</Link> : <Text key={value}>{label}</Text>
          })}
        </View>
      ) : null}
    </View>
  )
}

const PDFExperience = ({ items }: { items: Experience[] }) => {
  const experience = items.filter(hasExperienceContent)
  if (experience.length === 0) return null
  return (
    <PDFSection label="Experience">
      <View style={styles.entries}>
        {experience.map((item) => {
          const meta = [item.company, item.location].filter(Boolean).join(' / ')
          const highlights = item.highlights.filter((highlight) => highlight.trim())
          return (
            <View
              key={item.id}
              style={styles.entry}
              wrap={!keepEntryTogether([item.position, item.company, item.location, ...highlights])}
            >
              <Text style={styles.rail}>{formatPdfDateRange(item.startDate, item.endDate, item.current)}</Text>
              <View style={styles.entryBody}>
                {item.position ? <Text style={styles.entryTitle}>{item.position}</Text> : null}
                {meta ? <Text style={styles.entryMeta}>{meta}</Text> : null}
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
            </View>
          )
        })}
      </View>
    </PDFSection>
  )
}

const PDFEducation = ({ items }: { items: Education[] }) => {
  const education = items.filter(hasEducationContent)
  if (education.length === 0) return null
  return (
    <PDFSection label="Education">
      <View style={styles.entries}>
        {education.map((item) => {
          const degree = [item.degree, item.field].filter(Boolean).join(', ')
          return (
            <View
              key={item.id}
              style={styles.entry}
              wrap={!keepEntryTogether([item.degree, item.field, item.institution, item.description])}
            >
              <Text style={styles.rail}>{formatPdfDateRange(item.startDate, item.endDate)}</Text>
              <View style={styles.entryBody}>
                {degree ? <Text style={styles.entryTitle}>{degree}</Text> : null}
                {item.institution ? <Text style={styles.entryMeta}>{item.institution}</Text> : null}
                {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
              </View>
            </View>
          )
        })}
      </View>
    </PDFSection>
  )
}

const PDFSkills = ({ items }: { items: SkillGroup[] }) => {
  const groups = items
    .map((group) => ({ ...group, skills: group.skills.filter((skill) => skill.trim()) }))
    .filter((group) => group.skills.length > 0)
  if (groups.length === 0) return null
  return (
    <PDFSection label="Capabilities">
      <View style={styles.skills}>
        {groups.map((group) => (
          <View key={group.id} style={styles.skillGroup} wrap={false}>
            {group.name ? <Text style={styles.skillTitle}>{group.name}</Text> : null}
            <Text style={styles.skillList}>{group.skills.join(', ')}</Text>
          </View>
        ))}
      </View>
    </PDFSection>
  )
}

const PDFProjects = ({ items }: { items: Project[] }) => {
  const projects = items.filter(hasProjectContent)
  if (projects.length === 0) return null
  return (
    <PDFSection label="Selected work">
      <View style={styles.entries}>
        {projects.map((project, index) => {
          const url = toHttpUrl(project.url)
          const technologies = project.technologies.filter((technology) => technology.trim())
          return (
            <View
              key={project.id}
              style={styles.entry}
              wrap={!keepEntryTogether([project.name, project.description, ...technologies])}
            >
              <Text style={styles.rail}>{String(index + 1).padStart(2, '0')}</Text>
              <View style={styles.entryBody}>
                {project.name ? (
                  <View style={styles.entryTitleRow}>
                    <Text style={styles.entryTitle}>{project.name}</Text>
                    {url ? <Link src={url} style={styles.inlineLink}>View project</Link> : null}
                  </View>
                ) : null}
                {project.description ? <Text style={styles.description}>{project.description}</Text> : null}
                {technologies.length > 0 ? <Text style={styles.stack}><Text style={styles.stackLabel}>Stack </Text>{technologies.join(', ')}</Text> : null}
              </View>
            </View>
          )
        })}
      </View>
    </PDFSection>
  )
}

const PDFCertifications = ({ items }: { items: Certification[] }) => {
  const certifications = items.filter(hasCertificationContent)
  if (certifications.length === 0) return null
  return (
    <PDFSection label="Credentials">
      <View style={styles.entries}>
        {certifications.map((certification) => {
          const url = toHttpUrl(certification.url)
          return (
            <View
              key={certification.id}
              style={styles.entry}
              wrap={!keepEntryTogether([certification.name, certification.issuer, certification.date])}
            >
              <Text style={styles.rail}>{certification.date}</Text>
              <View style={styles.entryBody}>
                {certification.name ? (
                  <View style={styles.entryTitleRow}>
                    <Text style={styles.entryTitle}>{certification.name}</Text>
                    {url ? <Link src={url} style={styles.inlineLink}>Verify</Link> : null}
                  </View>
                ) : null}
                {certification.issuer ? <Text style={styles.entryMeta}>{certification.issuer}</Text> : null}
              </View>
            </View>
          )
        })}
      </View>
    </PDFSection>
  )
}

export const PDFResumeDocument = ({ data }: PDFResumeDocumentProps) => (
  <Document title={`${data.personal.name || 'Resume'} - Resume`} author={data.personal.name || undefined}>
    <Page size="A4" style={styles.page} wrap>
      <PDFHeader data={data} />
      {data.summary.trim() ? (
        <PDFSection label="Profile" first>
          <Text style={styles.summary}>{data.summary}</Text>
        </PDFSection>
      ) : null}
      <PDFExperience items={data.experience} />
      <PDFEducation items={data.education} />
      <PDFSkills items={data.skillGroups} />
      <PDFProjects items={data.projects} />
      <PDFCertifications items={data.certifications} />
    </Page>
  </Document>
)
