import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Login";
import { supabase } from "./lib/supabaseClient";

/* ---------- ICONS ---------- */

function Icon({ children, size = 18, strokeWidth = 1.7 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const IconGrid = (p) => (
  <Icon {...p}>
    <rect x="3" y="3" width="7.5" height="7.5" rx="1.6" />
    <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" />
    <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" />
  </Icon>
);

const IconCap = (p) => (
  <Icon {...p}>
    <path d="M12 3 2 8l10 5 10-5-10-5Z" />
    <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
    <path d="M22 8v6" />
  </Icon>
);

const IconClipboard = (p) => (
  <Icon {...p}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
    <path d="M9 11h6M9 15h6M9 19h3" />
  </Icon>
);

const IconBook = (p) => (
  <Icon {...p}>
    <path d="M4 5c0-1.1.9-2 2-2h6v16H6c-1.1 0-2 .5-2 1.5V5Z" />
    <path d="M20 5c0-1.1-.9-2-2-2h-6v16h6c1.1 0 2 .5 2 1.5V5Z" />
  </Icon>
);

const IconCheck = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5 10.5 15 16 9.5" />
  </Icon>
);

const IconCard = (p) => (
  <Icon {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.4" />
    <path d="M2.5 9.5h19" />
    <path d="M6 15h4" />
  </Icon>
);

const IconMegaphone = (p) => (
  <Icon {...p}>
    <path d="M3 9v6h3l9 4V5L6 9H3Z" />
    <path d="M17 9a4 4 0 0 1 0 6" />
  </Icon>
);

const IconMessage = (p) => (
  <Icon {...p}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H11l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5v-8Z" />
    <path d="M8 8h8M8 11.5h5" />
  </Icon>
);

const IconSend = (p) => (
  <Icon {...p}>
    <path d="m21 3-7.2 18-3.2-7.2L3 10.6 21 3Z" />
    <path d="M10.7 13.3 15 9" />
  </Icon>
);

const IconUsers = (p) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <circle cx="17.5" cy="9" r="2.3" />
    <path d="M15.8 14.2a5 5 0 0 1 5.2 5" />
  </Icon>
);

const IconBell = (p) => (
  <Icon {...p}>
    <path d="M6 10a6 6 0 0 1 12 0v4l1.5 3h-15L6 14v-4Z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </Icon>
);

const IconPlus = (p) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

const IconClock = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.5l3.6 2" />
  </Icon>
);

const IconSparkle = (p) => (
  <Icon {...p}>
    <path d="M12 3.5 13.8 9l5.2 1.8-5.2 1.8L12 18.4l-1.8-5.8L5 10.8 10.2 9 12 3.5Z" />
  </Icon>
);

const IconArrowRight = (p) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

const IconSearch = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </Icon>
);

const IconChevronLeft = (p) => (
  <Icon {...p}>
    <path d="m14.5 6-6 6 6 6" />
  </Icon>
);

const IconChevronRight = (p) => (
  <Icon {...p}>
    <path d="m9.5 6 6 6-6 6" />
  </Icon>
);

const IconFilter = (p) => (
  <Icon {...p}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </Icon>
);

const IconCalendar = (p) => (
  <Icon {...p}>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M8 3v4M16 3v4M4 10h16" />
  </Icon>
);

const IconClose = (p) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
);

const IconLogout = (p) => (
  <Icon {...p}>
    <path d="M14 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7" />
    <path d="M10 12h10m0 0-3.2-3.2M20 12l-3.2 3.2" />
  </Icon>
);


/* ================================================= */
/* ==================== APP ========================= */
/* ================================================= */

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("cognitiax_crm_user")) || null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const loggedIn = sessionStorage.getItem("cognitiax_crm_logged_in") === "true";
    try {
      const user = JSON.parse(sessionStorage.getItem("cognitiax_crm_user"));
      return loggedIn && !!user?.email;
    } catch {
      return false;
    }
  });

  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [whatsappLoading, setWhatsappLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setWhatsappLoading(false);
      return undefined;
    }

    const checkWhatsAppStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/whatsapp/status"
        );

        const data = await response.json();

        setWhatsappConnected(data.connected === true);
      } catch (error) {
        console.error("WhatsApp status error:", error);
        setWhatsappConnected(false);
      } finally {
        setWhatsappLoading(false);
      }
    };

    checkWhatsAppStatus();

    const interval = setInterval(checkWhatsAppStatus, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogout = () => {
    sessionStorage.removeItem("cognitiax_crm_logged_in");
    sessionStorage.removeItem("cognitiax_crm_user");
    localStorage.removeItem("cognitiax_crm_logged_in");
    localStorage.removeItem("cognitiax_crm_user");
    setIsAuthenticated(false);
    setCurrentUser(null);
    setWhatsappConnected(false);
    setWhatsappLoading(false);
  };
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const [showStudentForm, setShowStudentForm] =
    useState(false);

  const [showAdmissionForm, setShowAdmissionForm] =
    useState(false);
const [editingAdmission, setEditingAdmission] = useState(null);
const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] =
    useState("");


  /* ================= STUDENTS DATA ================= */

  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(true);

  const studentFromRow = (row) => ({
    id: row.id,
    name: row.full_name || "",
    phone: row.phone || "",
    email: row.email || "",
    course: row.course || "",
    batch: row.batch || "",
    status: row.status || "Active",
    fee: row.fee || "₹0",
    paidFee: row.paid_fee || "₹0",
  });

  const studentToRow = (student) => {
    const row = {
      full_name: student.name || "",
      phone: student.phone || "",
      email: student.email || "",
      course: student.course || "",
      batch: student.batch || "",
      status: student.status || "Active",
      fee: student.fee || "₹0",
      paid_fee: student.paidFee || "₹0",
    };

    // Supabase generates the UUID automatically for new students.
    // Keep the existing UUID only when updating an existing student.
    if (student.id) {
      row.id = student.id;
    }

    return row;
  };

  useEffect(() => {
    let active = true;

    const loadStudents = async () => {
      setStudentsLoading(true);

      const { data, error } = await supabase
        .from("students")
        .select("id, full_name, phone, email, course, batch, status, fee, paid_fee")
        .order("id", { ascending: true });

      if (error) {
        console.error("Students load error:", error);
        alert(`Could not load students from Supabase: ${error.message}`);
        if (active) setStudentsLoading(false);
        return;
      }

      if (data && data.length > 0) {
        if (active) setStudents(data.map(studentFromRow));
        if (active) setStudentsLoading(false);
        return;
      }

      // First-time migration: if Supabase is empty, import the current browser data once.
      try {
        const savedStudents = localStorage.getItem("students");
        if (savedStudents) {
          const localStudents = JSON.parse(savedStudents);
          if (Array.isArray(localStudents) && localStudents.length > 0) {
            const rows = localStudents.map((student) => ({
              ...studentToRow(student),
            }));

            const { data: imported, error: importError } = await supabase
              .from("students")
              .insert(rows)
              .select("id, full_name, phone, email, course, batch, status, fee, paid_fee");

            if (importError) {
              console.error("Students migration error:", importError);
              alert(`Students table is ready, but existing local students could not be imported: ${importError.message}`);
            } else if (active) {
              setStudents((imported || []).map(studentFromRow));
            }
          }
        }
      } catch (migrationError) {
        console.error("Students migration error:", migrationError);
      }

      if (active) setStudentsLoading(false);
    };

    loadStudents();
    return () => { active = false; };
  }, []);

  /* ================= NEW STUDENT ================= */

  const [newStudent, setNewStudent] = useState({
  name: "",
  phone: "",
  email: "",
  course: "",
  batch: "",
  fee: "",
  paidFee: "",
});



  /* ================= ADMISSIONS DATA ================= */

  const [admissions, setAdmissions] = useState([]);
  const [admissionsLoading, setAdmissionsLoading] = useState(true);

  const admissionFromRow = (row) => ({
    id: row.id,
    student: row.student || "",
    course: row.course || "",
    batch: row.batch || "",
    date: row.date || "",
    status: row.status || "Confirmed",
  });

  const admissionToRow = (admission) => ({
    student: admission.student || "",
    course: admission.course || "",
    batch: admission.batch || "",
    date: admission.date || "",
    status: admission.status || "Confirmed",
  });

  useEffect(() => {
    let active = true;

    const loadAdmissions = async () => {
      const { data, error } = await supabase
        .from("admissions")
        .select("id, student, course, batch, date, status")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Admissions load error:", error);
        if (active) {
          setAdmissionsLoading(false);
          alert(`Could not load admissions from Supabase: ${error.message}`);
        }
        return;
      }

      if (data && data.length > 0) {
        if (active) setAdmissions(data.map(admissionFromRow));
        if (active) setAdmissionsLoading(false);
        return;
      }

      // First-time migration: import the current browser admissions once.
      try {
        const savedAdmissions = localStorage.getItem("admissions");
        if (savedAdmissions) {
          const localAdmissions = JSON.parse(savedAdmissions);
          if (Array.isArray(localAdmissions) && localAdmissions.length > 0) {
            const rows = localAdmissions.map(admissionToRow);
            const { data: imported, error: importError } = await supabase
              .from("admissions")
              .insert(rows)
              .select("id, student, course, batch, date, status");

            if (importError) {
              console.error("Admissions migration error:", importError);
              alert(`Admissions table is ready, but existing local admissions could not be imported: ${importError.message}`);
            } else if (active) {
              setAdmissions((imported || []).map(admissionFromRow));
            }
          }
        }
      } catch (migrationError) {
        console.error("Admissions migration error:", migrationError);
      }

      if (active) setAdmissionsLoading(false);
    };

    loadAdmissions();
    return () => { active = false; };
  }, []);


  /* ================= PAYMENTS DATA ================= */

  const [payments, setPayments] = useState([]);
  const [paymentsLoading, setPaymentsLoading] = useState(true);

  const paymentFromRow = (row) => ({
    id: row.id,
    studentId: row.student_id,
    student: row.student || "",
    studentEmail: row.student_email || "",
    course: row.course || "",
    batch: row.batch || "",
    amount: Number(row.amount) || 0,
    date: row.date || "",
    paidForMonth: row.paid_for_month || "",
    nextInstallmentDate: row.next_installment_date || "",
    mode: row.mode || "UPI",
    reference: row.reference || "",
    totalPaid: Number(row.total_paid) || 0,
    pending: Number(row.pending) || 0,
    createdAt: row.created_at || "",
  });

  const paymentToRow = (payment) => ({
    student_id: payment.studentId,
    student: payment.student || "",
    student_email: payment.studentEmail || "",
    course: payment.course || "",
    batch: payment.batch || "",
    amount: Number(payment.amount) || 0,
    date: payment.date || "",
    paid_for_month: payment.paidForMonth || "",
    next_installment_date: payment.nextInstallmentDate || "",
    mode: payment.mode || "UPI",
    reference: payment.reference || "",
    total_paid: Number(payment.totalPaid) || 0,
    pending: Number(payment.pending) || 0,
  });

  useEffect(() => {
    let active = true;

    const loadPayments = async () => {
      setPaymentsLoading(true);

      const { data, error } = await supabase
        .from("payments")
        .select("id, student_id, student, student_email, course, batch, amount, date, paid_for_month, next_installment_date, mode, reference, total_paid, pending, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Payments load error:", error);
        if (active) {
          setPayments([]);
          setPaymentsLoading(false);
          alert(`Could not load payments: ${error.message}`);
        }
        return;
      }

      let rows = data || [];

      // One-time migration of existing browser payments.
      if (rows.length === 0 && !localStorage.getItem("payments_supabase_migrated")) {
        try {
          const savedPayments = JSON.parse(localStorage.getItem("payments") || "[]");
          const validStudents = students;

          const migrationRows = savedPayments
            .map((payment) => {
              const matchedStudent = validStudents.find(
                (student) => String(student.id) === String(payment.studentId) ||
                  (student.name === payment.student && student.phone === payment.phone)
              );
              if (!matchedStudent) return null;

              return paymentToRow({
                ...payment,
                studentId: matchedStudent.id,
                student: matchedStudent.name,
                studentEmail: matchedStudent.email || payment.studentEmail || "",
                course: matchedStudent.course || payment.course || "",
                batch: matchedStudent.batch || payment.batch || "",
              });
            })
            .filter(Boolean);

          if (migrationRows.length) {
            const { data: migrated, error: migrationError } = await supabase
              .from("payments")
              .insert(migrationRows)
              .select("id, student_id, student, student_email, course, batch, amount, date, paid_for_month, next_installment_date, mode, reference, total_paid, pending, created_at");

            if (migrationError) {
              console.error("Payments migration error:", migrationError);
            } else {
              rows = migrated || [];
            }
          }

          localStorage.setItem("payments_supabase_migrated", "true");
        } catch (migrationError) {
          console.error("Payments local migration error:", migrationError);
        }
      }

      if (active) {
        setPayments(rows.map(paymentFromRow));
        setPaymentsLoading(false);
      }
    };

    loadPayments();
    return () => { active = false; };
  }, [students.length]);

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  const [newPayment, setNewPayment] = useState({
    studentId: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    paidForMonth: new Date().toISOString().slice(0, 7),
    nextInstallmentDate: "",
    mode: "UPI",
    reference: "",
  });


  /* ================= NEW ADMISSION ================= */

  const [newAdmission, setNewAdmission] = useState({
    student: "",
    course: "",
    batch: "",
    status: "Confirmed",
  });

  /* ================= COMMUNICATION CENTER ================= */
  const [announcements, setAnnouncements] = useState(() => {
    try { return JSON.parse(localStorage.getItem("announcements")) || []; } catch { return []; }
  });
  const [whatsappLogs, setWhatsappLogs] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("whatsappLogs")) || [];
      // Normalise old browser logs: the wa.me flow cannot confirm delivery/failure.
      return Array.isArray(saved)
        ? saved.map((log) => ({
            ...log,
            status: log?.status === "Failed"
              ? "Opened in WhatsApp - press Send"
              : log?.status || "Prepared - open WhatsApp and press Send",
          }))
        : [];
    } catch {
      return [];
    }
  });
  const [communicationTab, setCommunicationTab] = useState("Announcements");
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [announcementSearch, setAnnouncementSearch] = useState("");
  const [announcementFilter, setAnnouncementFilter] = useState("All");
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    category: "Holiday",
    targetType: "All Students",
    targetValue: "",
    date: new Date().toISOString().split("T")[0],
    message: "",
  });
  const [showWhatsappForm, setShowWhatsappForm] = useState(false);
  const [newWhatsapp, setNewWhatsapp] = useState({
    studentId: "",
    template: "Fee Reminder",
    amountDue: "",
    sendMode: "Student",
    batchName: "",
    message: "",
  });

  useEffect(() => { localStorage.setItem("announcements", JSON.stringify(announcements)); }, [announcements]);
  useEffect(() => { localStorage.setItem("whatsappLogs", JSON.stringify(whatsappLogs)); }, [whatsappLogs]);


  /* ================= COURSES & BATCHES ================= */

  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  const courseFromRow = (row) => ({
    id: row.id,
    name: row.course_name || "",
    description: row.description || "",
    duration: row.duration || "",
    fee: row.total_fee ?? "",
    mode: row.mode || "Offline",
    status: row.status || "Active",
  });

  const courseToRow = (course) => ({
    course_name: course.name || "",
    description: course.description || "",
    duration: course.duration || "",
    total_fee: Number(course.fee) || 0,
    mode: course.mode || "Offline",
    status: course.status || "Active",
  });

  useEffect(() => {
    let active = true;

    const loadCourses = async () => {
      setCoursesLoading(true);

      const { data, error } = await supabase
        .from("courses")
        .select("id, course_name, description, duration, total_fee, mode, status")
        .order("course_name", { ascending: true });

      if (error) {
        console.error("Courses load error:", error);
        if (active) {
          setCoursesLoading(false);
          alert(`Could not load courses from Supabase: ${error.message}`);
        }
        return;
      }

      let rows = data || [];

      // One-time migration: import existing browser courses if Supabase is empty.
      if (rows.length === 0 && !localStorage.getItem("courses_supabase_migrated")) {
        try {
          const savedCourses = JSON.parse(localStorage.getItem("courses") || "[]");

          if (Array.isArray(savedCourses) && savedCourses.length > 0) {
            const migrationRows = savedCourses
              .filter((course) => course?.name?.trim())
              .map(courseToRow);

            if (migrationRows.length) {
              const { data: migrated, error: migrationError } = await supabase
                .from("courses")
                .insert(migrationRows)
                .select("id, course_name, description, duration, total_fee, mode, status");

              if (migrationError) {
                console.error("Courses migration error:", migrationError);
                alert(`Courses table is ready, but existing local courses could not be imported: ${migrationError.message}`);
              } else {
                rows = migrated || [];
              }
            }
          }

          localStorage.setItem("courses_supabase_migrated", "true");
        } catch (migrationError) {
          console.error("Courses local migration error:", migrationError);
        }
      }

      if (active) {
        setCourses(rows.map(courseFromRow));
        setCoursesLoading(false);
      }
    };

    loadCourses();
    return () => { active = false; };
  }, []);

  const [batches, setBatches] = useState([]);
  const [batchesLoading, setBatchesLoading] = useState(true);

  const batchFromRow = (row, courseRows = []) => {
    const linkedCourse = courseRows.find((course) => course.id === row.course_id);

    return {
      id: row.id,
      name: row.batch_name || "",
      course: linkedCourse?.course_name || row.course_name || "",
      courseId: row.course_id || "",
      trainer: row.trainer_name || "",
      trainerId: row.trainer_id || "",
      timing: row.class_time || "",
      startDate: row.start_date || "",
      endDate: row.end_date || "",
      mode: row.mode || "Offline",
      status: row.status || "Active",
      whatsappGroupLink: row.default_zoom_link || "",
      maxStudents: row.max_students ?? "",
      classDays: row.class_days || "",
    };
  };

  const batchToRow = (batch, courseRows = []) => {
    const linkedCourse = courseRows.find(
      (course) =>
        course.id === batch.courseId ||
        course.course_name?.trim().toLowerCase() === batch.course?.trim().toLowerCase()
    );

    return {
      batch_name: batch.name?.trim() || "",
      course_id: linkedCourse?.id || batch.courseId || null,
      trainer_id: batch.trainerId || null,
      trainer_name: batch.trainer?.trim() || null,
      start_date: batch.startDate || null,
      end_date: batch.endDate || null,
      max_students:
        batch.maxStudents === "" || batch.maxStudents == null
          ? null
          : Number(batch.maxStudents) || null,
      class_days: batch.classDays || null,
      class_time: batch.timing || null,
      default_zoom_link: batch.whatsappGroupLink || null,
      mode: batch.mode || "Offline",
      status: batch.status || "Active",
    };
  };

  useEffect(() => {
    let active = true;

    const loadBatches = async () => {
      setBatchesLoading(true);

      const [{ data: batchRows, error: batchError }, { data: courseRows, error: courseError }] =
        await Promise.all([
          supabase
            .from("batches")
            .select(
              "id, batch_name, course_id, trainer_id, trainer_name, start_date, end_date, max_students, class_days, class_time, default_zoom_link, mode, status"
            )
            .order("start_date", { ascending: true }),
          supabase
            .from("courses")
            .select("id, course_name")
            .order("course_name", { ascending: true }),
        ]);

      if (batchError) {
        console.error("Batches load error:", batchError);
        if (active) {
          setBatchesLoading(false);
          alert(`Could not load batches from Supabase: ${batchError.message}`);
        }
        return;
      }

      if (courseError) {
        console.error("Batch course lookup error:", courseError);
      }

      let rows = batchRows || [];
      const coursesForLookup = courseRows || [];

      // One-time migration of existing browser batches.
      if (rows.length === 0 && !localStorage.getItem("batches_supabase_migrated")) {
        try {
          const savedBatches = JSON.parse(localStorage.getItem("batches") || "[]");

          if (Array.isArray(savedBatches) && savedBatches.length > 0) {
            const migrationRows = savedBatches
              .filter((batch) => batch?.name?.trim())
              .map((batch) => batchToRow(batch, coursesForLookup));

            if (migrationRows.length) {
              const { data: migrated, error: migrationError } = await supabase
                .from("batches")
                .insert(migrationRows)
                .select(
                  "id, batch_name, course_id, trainer_id, trainer_name, start_date, end_date, max_students, class_days, class_time, default_zoom_link, mode, status"
                );

              if (migrationError) {
                console.error("Batches migration error:", migrationError);
                alert(`Batches table is ready, but existing local batches could not be imported: ${migrationError.message}`);
              } else {
                rows = migrated || [];
              }
            }
          }

          localStorage.setItem("batches_supabase_migrated", "true");
        } catch (migrationError) {
          console.error("Batches local migration error:", migrationError);
        }
      }

      if (active) {
        setBatches(rows.map((row) => batchFromRow(row, coursesForLookup)));
        setBatchesLoading(false);
      }
    };

    loadBatches();

    return () => {
      active = false;
    };
  }, []);

  /* ================= STAFF DATA ================= */

  const [staff, setStaff] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("staff")) || [];
    } catch {
      return [];
    }
  });

  const [showStaffForm, setShowStaffForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [staffSearch, setStaffSearch] = useState("");
  const [staffStatusFilter, setStaffStatusFilter] = useState("All");
  const [staffRoleFilter, setStaffRoleFilter] = useState("All");
  const [newStaff, setNewStaff] = useState({
    name: "",
    phone: "",
    email: "",
    role: "Trainer",
    joinDate: "",
    status: "Active",
  });

  /* ================= STAFF ATTENDANCE ================= */
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("staffAttendance")) || [];
    } catch {
      return [];
    }
  });
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [attendanceMonth, setAttendanceMonth] = useState(new Date().toISOString().slice(0, 7));
  const [attendanceSearch, setAttendanceSearch] = useState("");
  const [attendanceStaffFilter, setAttendanceStaffFilter] = useState("All");
  const [attendanceStatusFilter, setAttendanceStatusFilter] = useState("All");
  const [newAttendance, setNewAttendance] = useState({
    staffId: "",
    date: new Date().toISOString().split("T")[0],
    checkIn: "",
    checkOut: "",
    status: "Present",
    note: "",
  });

  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseSearch, setCourseSearch] = useState("");
  const [courseStatusFilter, setCourseStatusFilter] = useState("All");
  const [newCourse, setNewCourse] = useState({
    name: "",
    duration: "",
    fee: "",
    mode: "Offline",
    description: "",
    status: "Active",
  });

  const [showBatchForm, setShowBatchForm] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [newBatch, setNewBatch] = useState({
    name: "",
    course: "",
    trainer: "",
    timing: "",
    startDate: "",
    endDate: "",
    mode: "Offline",
    status: "Active",
    whatsappGroupLink: "",
  });





  useEffect(() => {
    localStorage.setItem("staff", JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem("staffAttendance", JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  const handleAddCourse = async (e) => {
    e.preventDefault();

    const courseName = newCourse.name.trim();
    if (!courseName || !newCourse.duration || newCourse.fee === "") {
      alert("Please fill Course Name, Duration and Fee!");
      return;
    }

    const duplicate = courses.some((course) =>
      course.name?.trim().toLowerCase() === courseName.toLowerCase() &&
      course.id !== editingCourse?.id
    );

    if (duplicate) {
      alert("A course with this name already exists!");
      return;
    }

    const courseData = {
      ...newCourse,
      name: courseName,
      fee: Number(newCourse.fee) || 0,
    };

    if (editingCourse) {
      const oldName = editingCourse.name;

      const { data, error } = await supabase
        .from("courses")
        .update(courseToRow(courseData))
        .eq("id", editingCourse.id)
        .select("id, course_name, description, duration, total_fee, mode, status")
        .single();

      if (error) {
        console.error("Course update error:", error);
        alert(`Could not update course: ${error.message}`);
        return;
      }

      setCourses((items) =>
        items.map((course) =>
          course.id === editingCourse.id ? courseFromRow(data) : course
        )
      );

      // Keep linked Supabase records consistent when the course is renamed.
      if (oldName !== courseName) {
        const { error: studentUpdateError } = await supabase
          .from("students")
          .update({ course: courseName })
          .eq("course", oldName);

        if (studentUpdateError) {
          console.error("Linked students course update error:", studentUpdateError);
        }

        const { error: admissionUpdateError } = await supabase
          .from("admissions")
          .update({ course: courseName })
          .eq("course", oldName);

        if (admissionUpdateError) {
          console.error("Linked admissions course update error:", admissionUpdateError);
        }

        const { error: paymentUpdateError } = await supabase
          .from("payments")
          .update({ course: courseName })
          .eq("course", oldName);

        if (paymentUpdateError) {
          console.error("Linked payments course update error:", paymentUpdateError);
        }

        setStudents((items) => items.map((student) =>
          student.course === oldName ? { ...student, course: courseName } : student
        ));
        setAdmissions((items) => items.map((admission) =>
          admission.course === oldName ? { ...admission, course: courseName } : admission
        ));
        setPayments((items) => items.map((payment) =>
          payment.course === oldName ? { ...payment, course: courseName } : payment
        ));
      }
    } else {
      const { data, error } = await supabase
        .from("courses")
        .insert(courseToRow(courseData))
        .select("id, course_name, description, duration, total_fee, mode, status")
        .single();

      if (error) {
        console.error("Course insert error:", error);
        alert(`Could not add course: ${error.message}`);
        return;
      }

      setCourses((items) => [...items, courseFromRow(data)]);
    }

    setNewCourse({
      name: "",
      duration: "",
      fee: "",
      mode: "Offline",
      description: "",
      status: "Active",
    });
    setEditingCourse(null);
    setShowCourseForm(false);
  };

  const handleEditCourse = (course) => {
    setNewCourse({
      name: course.name || "",
      duration: course.duration || "",
      fee: course.fee ?? "",
      mode: course.mode || "Offline",
      description: course.description || "",
      status: course.status || "Active",
    });
    setEditingCourse(course);
    setShowCourseForm(true);
  };

  const handleDeleteCourse = async (course) => {
    const linkedBatches = batches.filter((batch) => batch.course === course.name);
    const linkedStudents = students.filter((student) => student.course === course.name);

    if (linkedBatches.length || linkedStudents.length) {
      alert(
        `Cannot delete ${course.name} because it is linked to ${linkedBatches.length} batch(es) and ${linkedStudents.length} student(s). Move/remove those records first.`
      );
      return;
    }

    if (!window.confirm(`Delete ${course.name}?`)) return;

    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", course.id);

    if (error) {
      console.error("Course delete error:", error);
      alert(`Could not delete course: ${error.message}`);
      return;
    }

    setCourses((items) => items.filter((item) => item.id !== course.id));
  };

  const handleAddStaff = (e) => {
    e.preventDefault();

    const staffName = newStaff.name.trim();
    if (!staffName || !newStaff.phone || !newStaff.role) {
      alert("Please fill Name, Phone and Role!");
      return;
    }

    const duplicate = staff.some((member) =>
      member.name?.trim().toLowerCase() === staffName.toLowerCase() &&
      member.id !== editingStaff?.id
    );

    if (duplicate) {
      alert("A staff member with this name already exists!");
      return;
    }

    if (editingStaff) {
      const oldName = editingStaff.name;
      setStaff(staff.map((member) =>
        member.id === editingStaff.id ? { ...member, ...newStaff, name: staffName } : member
      ));

      // Keep linked batch trainer names updated when a trainer is renamed.
      if (oldName !== staffName) {
        setBatches((items) => items.map((batch) =>
          batch.trainer === oldName ? { ...batch, trainer: staffName } : batch
        ));
      }
    } else {
      setStaff([...staff, { id: Date.now(), ...newStaff, name: staffName }]);
    }

    setNewStaff({ name: "", phone: "", email: "", role: "Trainer", joinDate: "", status: "Active" });
    setEditingStaff(null);
    setShowStaffForm(false);
  };

  const handleEditStaff = (member) => {
    setNewStaff({
      name: member.name || "",
      phone: member.phone || "",
      email: member.email || "",
      role: member.role || "Trainer",
      joinDate: member.joinDate || "",
      status: member.status || "Active",
    });
    setEditingStaff(member);
    setShowStaffForm(true);
  };

  const handleDeleteStaff = (member) => {
    const assignedBatches = batches.filter((batch) => batch.trainer === member.name);
    if (assignedBatches.length) {
      alert(`${member.name} is assigned to ${assignedBatches.length} batch(es). Reassign the batch trainer before deleting this staff member.`);
      return;
    }
    if (!window.confirm(`Delete ${member.name}?`)) return;
    setStaff(staff.filter((item) => item.id !== member.id));
  };

  const getStaffBatches = (member) =>
    batches.filter((batch) => batch.trainer === member.name);

  const getAttendanceStatus = (checkIn, requestedStatus) => {
    if (["Absent", "Leave", "WFH", "Off"].includes(requestedStatus)) return requestedStatus;
    if (!checkIn) return requestedStatus || "Present";
    return checkIn <= "10:15" ? "Present" : "Half Day";
  };

  const getCheckoutLabel = (checkOut) => {
    if (!checkOut) return "—";
    return checkOut >= "19:00" ? "Normal Checkout" : "Early Checkout";
  };

  const changeAttendanceMonth = (offset) => {
    const d = new Date(`${attendanceMonth}-01T00:00:00`);
    d.setMonth(d.getMonth() + offset);
    setAttendanceMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  };

  const formatAttendanceMonth = (value) => {
    if (!value) return "";
    const [year, month] = value.split("-");
    return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  };

  const handleAddAttendance = (e) => {
    e.preventDefault();
    if (!newAttendance.staffId || !newAttendance.date) {
      alert("Please select staff member and date!");
      return;
    }
    if (new Date(`${newAttendance.date}T00:00:00`).getDay() === 0) {
      alert("Sunday is an off day. You do not need to add attendance for Sunday.");
      return;
    }
    const existing = attendanceRecords.find((record) =>
      String(record.staffId) === String(newAttendance.staffId) &&
      record.date === newAttendance.date &&
      record.id !== editingAttendance?.id
    );
    if (existing) {
      alert("Attendance already exists for this staff member on this date.");
      return;
    }
    const staffMember = staff.find((member) => String(member.id) === String(newAttendance.staffId));
    if (!staffMember) {
      alert("Selected staff member was not found.");
      return;
    }
    const record = {
      ...(editingAttendance || {}),
      id: editingAttendance?.id || Date.now(),
      staffId: staffMember.id,
      staffName: staffMember.name,
      date: newAttendance.date,
      checkIn: newAttendance.checkIn,
      checkOut: newAttendance.checkOut,
      status: getAttendanceStatus(newAttendance.checkIn, newAttendance.status),
      checkoutStatus: getCheckoutLabel(newAttendance.checkOut),
      note: newAttendance.note.trim(),
    };
    if (editingAttendance) {
      setAttendanceRecords((items) => items.map((item) => item.id === editingAttendance.id ? record : item));
    } else {
      setAttendanceRecords((items) => [record, ...items]);
    }
    setNewAttendance({ staffId: "", date: new Date().toISOString().split("T")[0], checkIn: "", checkOut: "", status: "Present", note: "" });
    setEditingAttendance(null);
    setShowAttendanceForm(false);
  };

  const handleEditAttendance = (record) => {
    setNewAttendance({
      staffId: String(record.staffId), date: record.date || "", checkIn: record.checkIn || "", checkOut: record.checkOut || "",
      status: record.status || "Present", note: record.note || "",
    });
    setEditingAttendance(record);
    setShowAttendanceForm(true);
  };

  const handleDeleteAttendance = (record) => {
    if (!window.confirm(`Delete attendance for ${record.staffName} on ${record.date}?`)) return;
    setAttendanceRecords((items) => items.filter((item) => item.id !== record.id));
  };

  const filteredStaff = staff.filter((member) => {
    const query = staffSearch.toLowerCase().trim();
    const matchesSearch = !query ||
      member.name?.toLowerCase().includes(query) ||
      member.phone?.toLowerCase().includes(query) ||
      member.email?.toLowerCase().includes(query) ||
      member.role?.toLowerCase().includes(query);
    const matchesStatus = staffStatusFilter === "All" || member.status === staffStatusFilter;
    const matchesRole = staffRoleFilter === "All" || member.role === staffRoleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleAddBatch = async (e) => {
    e.preventDefault();

    const batchName = newBatch.name.trim();

    if (!batchName || !newBatch.course || !newBatch.startDate) {
      alert("Please fill Batch Name, Course and Start Date!");
      return;
    }

    const duplicate = batches.some(
      (batch) =>
        batch.name?.trim().toLowerCase() === batchName.toLowerCase() &&
        batch.id !== editingBatch?.id
    );

    if (duplicate) {
      alert("A batch with this name already exists!");
      return;
    }

    // Resolve course_id from the Supabase courses table.
    const { data: courseRows, error: courseError } = await supabase
      .from("courses")
      .select("id, course_name");

    if (courseError) {
      console.error("Course lookup for batch failed:", courseError);
      alert(`Could not load courses: ${courseError.message}`);
      return;
    }

    const selectedCourse = (courseRows || []).find(
      (course) =>
        course.id === newBatch.course ||
        course.course_name?.trim().toLowerCase() === newBatch.course.trim().toLowerCase()
    );

    if (!selectedCourse) {
      alert("Selected course was not found in Supabase. Please select a valid course.");
      return;
    }

    const batchData = {
      ...newBatch,
      name: batchName,
      course: selectedCourse.course_name,
      courseId: selectedCourse.id,
    };

    if (editingBatch) {
      const { data, error } = await supabase
        .from("batches")
        .update(batchToRow(batchData, courseRows))
        .eq("id", editingBatch.id)
        .select(
          "id, batch_name, course_id, trainer_id, trainer_name, start_date, end_date, max_students, class_days, class_time, default_zoom_link, mode, status"
        )
        .single();

      if (error) {
        console.error("Batch update error:", error);
        alert(`Could not update batch: ${error.message}`);
        return;
      }

      setBatches((items) =>
        items.map((batch) =>
          batch.id === editingBatch.id
            ? batchFromRow(data, courseRows)
            : batch
        )
      );

      // Keep student records connected when a batch is renamed.
      if (editingBatch.name !== batchName) {
        const { error: studentUpdateError } = await supabase
          .from("students")
          .update({ batch: batchName })
          .eq("batch", editingBatch.name);

        if (studentUpdateError) {
          console.error("Linked students batch update error:", studentUpdateError);
        }

        setStudents((items) =>
          items.map((student) =>
            student.batch === editingBatch.name
              ? { ...student, batch: batchName }
              : student
          )
        );
      }
    } else {
      const { data, error } = await supabase
        .from("batches")
        .insert(batchToRow(batchData, courseRows))
        .select(
          "id, batch_name, course_id, trainer_id, trainer_name, start_date, end_date, max_students, class_days, class_time, default_zoom_link, mode, status"
        )
        .single();

      if (error) {
        console.error("Batch insert error:", error);
        alert(`Could not add batch: ${error.message}`);
        return;
      }

      setBatches((items) => [...items, batchFromRow(data, courseRows)]);
    }

    setNewBatch({
      name: "",
      course: "",
      trainer: "",
      timing: "",
      startDate: "",
      endDate: "",
      mode: "Offline",
      status: "Active",
      whatsappGroupLink: "",
    });
    setEditingBatch(null);
    setShowBatchForm(false);
  };

  const handleEditBatch = (batch) => {
    setNewBatch({
      name: batch.name || "",
      course: batch.course || "",
      trainer: batch.trainer || "",
      timing: batch.timing || "",
      startDate: batch.startDate || "",
      endDate: batch.endDate || "",
      mode: batch.mode || "Offline",
      status: batch.status || "Active",
      whatsappGroupLink: batch.whatsappGroupLink || "",
    });
    setEditingBatch(batch);
    setShowBatchForm(true);
  };

  const handleDeleteBatch = async (batch) => {
    const linkedStudents = students.filter(
      (student) => student.batch === batch.name
    );

    if (linkedStudents.length > 0) {
      alert(
        `Cannot delete ${batch.name} because ${linkedStudents.length} student(s) are linked to this batch. Move those students first.`
      );
      return;
    }

    if (!window.confirm(`Delete ${batch.name}?`)) return;

    const { error } = await supabase
      .from("batches")
      .delete()
      .eq("id", batch.id);

    if (error) {
      console.error("Batch delete error:", error);
      alert(`Could not delete batch: ${error.message}`);
      return;
    }

    setBatches((items) => items.filter((item) => item.id !== batch.id));
  };

  const getBatchStudents = (batchName) =>
    students.filter((student) => student.batch === batchName);

  const getCourseBatches = (courseName) =>
    batches.filter((batch) => batch.course === courseName);

  const selectedPaymentStudent = students.find(
    (student) => String(student.id) === String(newPayment.studentId)
  );

  /* ================= MENU ================= */

  const menuItems = [
    {
      label: "Dashboard",
      icon: <IconGrid size={17} />,
    },
    {
      label: "Students",
      icon: <IconCap size={17} />,
    },
    {
      label: "Admissions",
      icon: <IconClipboard size={17} />,
    },
    {
      label: "Courses",
      icon: <IconBook size={17} />,
    },
    {
      label: "Batches",
      icon: <IconUsers size={17} />,
    },
    {
      label: "Fees",
      icon: <span style={{ fontWeight: 700 }}>₹</span>,
    },
    {
      label: "Payments",
      icon: <IconCard size={17} />,
    },
    {
      label: "Announcements",
      icon: <IconMegaphone size={17} />,
    },
    {
      label: "Staff",
      icon: <IconUsers size={17} />,
    },
    {
      label: "Attendance",
      icon: <IconClipboard size={17} />,
    },
  ];


  /* ================= FILTER STUDENTS ================= */

  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      student.phone.includes(searchTerm) ||

      student.course
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

const handleEditStudent = (student) => {
  setNewStudent({
    name: student.name || "",
    phone: student.phone || "",
    email: student.email || "",
    course: student.course || "",
    batch: student.batch || "",
    fee: student.fee || "",
    paidFee: student.paidFee || "",
  });

  setEditingStudent(student);
  setShowStudentForm(true);
};
  /* ================= ADD STUDENT ================= */

const handleAddStudent = async (e) => {
  e.preventDefault();

  if (
    !newStudent.name ||
    !newStudent.phone ||
    !newStudent.course ||
    !newStudent.batch
  ) {
    alert("Please fill all required details!");
    return;
  }

  const studentData = {
    name: newStudent.name.trim(),
    phone: newStudent.phone.trim(),
    email: newStudent.email.trim(),
    course: newStudent.course,
    batch: newStudent.batch,
    status: editingStudent?.status || "Active",
    fee: newStudent.fee || "₹0",
    paidFee: newStudent.paidFee || "₹0",
  };

  if (editingStudent) {
    const { data, error } = await supabase
      .from("students")
      .update(studentToRow({ ...studentData, id: editingStudent.id }))
      .eq("id", editingStudent.id)
      .select("id, full_name, phone, email, course, batch, status, fee, paid_fee")
      .single();

    if (error) {
      console.error("Student update error:", error);
      alert(`Could not update student: ${error.message}`);
      return;
    }

    setStudents((items) =>
      items.map((student) =>
        student.id === editingStudent.id ? studentFromRow(data) : student
      )
    );
  } else {
    const { data, error } = await supabase
      .from("students")
      .insert(studentToRow(studentData))
      .select("id, full_name, phone, email, course, batch, status, fee, paid_fee")
      .single();

    if (error) {
      console.error("Student insert error:", error);
      alert(`Could not add student: ${error.message}`);
      return;
    }

    setStudents((items) => [...items, studentFromRow(data)]);
  }

  setNewStudent({
    name: "",
    phone: "",
    email: "",
    course: "",
    batch: "",
    fee: "",
    paidFee: "",
  });
  setEditingStudent(null);
  setShowStudentForm(false);
};



  /* ================= PAYMENT HELPERS ================= */

  const parseMoney = (value) =>
    Number(String(value || 0).replace(/[^0-9.-]/g, "")) || 0;

  const formatMoney = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const getTotalFees = () =>
    students.reduce((sum, student) => sum + parseMoney(student.fee), 0);

  const getPaidFees = () =>
    students.reduce((sum, student) => sum + parseMoney(student.paidFee), 0);

  const getPendingFees = () =>
    Math.max(0, getTotalFees() - getPaidFees());

  const getStudentPending = (student) =>
    Math.max(0, parseMoney(student.fee) - parseMoney(student.paidFee));

  const toMonthLabel = (ym) => {
    if (!ym) return "";
    const [year, month] = String(ym).split("-").map(Number);
    if (!year || !month) return "";
    return new Date(year, month - 1, 1).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  const addOneMonth = (dateValue) => {
    const d = new Date(`${dateValue}T00:00:00`);
    if (Number.isNaN(d.getTime())) return "";
    d.setMonth(d.getMonth() + 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const paymentDateDefaults = () => {
    const today = new Date().toISOString().split("T")[0];
    return {
      date: today,
      paidForMonth: today.slice(0, 7),
      nextInstallmentDate: addOneMonth(today),
    };
  };

  const openPaymentForm = (student = null) => {
    setShowWhatsappForm(false);
    setEditingPayment(null);
    const defaults = paymentDateDefaults();
    setNewPayment({
      studentId: student ? String(student.id) : "",
      amount: "",
      date: defaults.date,
      paidForMonth: defaults.paidForMonth,
      nextInstallmentDate: defaults.nextInstallmentDate,
      mode: "UPI",
      reference: "",
    });
    setShowPaymentForm(true);
  };

  const updateStudentPaidFeeInSupabase = async (studentId, paidTotal) => {
    const { error } = await supabase
      .from("students")
      .update({ paid_fee: formatMoney(paidTotal), updated_at: new Date().toISOString() })
      .eq("id", studentId);

    if (error) {
      console.error("Student fee update error:", error);
      throw error;
    }
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();

    const student = students.find(
      (item) => String(item.id) === String(newPayment.studentId)
    );
    const amount = parseMoney(newPayment.amount);

    if (!student || amount <= 0 || !newPayment.date || !newPayment.mode || !newPayment.paidForMonth || !newPayment.nextInstallmentDate) {
      alert("Please fill Student, Amount, Payment Date, Paid For Month, Next Installment Date and Payment Mode.");
      return;
    }

    if (editingPayment) {
      const oldAmount = parseMoney(editingPayment.amount);
      const oldStudent = students.find((item) => String(item.id) === String(editingPayment.studentId));
      const sameStudent = oldStudent && String(oldStudent.id) === String(student.id);

      if (sameStudent) {
        const maxAllowed = getStudentPending(student) + oldAmount;
        if (amount > maxAllowed) {
          alert(`Payment cannot be more than pending fee. Maximum: ${formatMoney(maxAllowed)}`);
          return;
        }
      } else {
        const newStudentPending = getStudentPending(student);
        if (amount > newStudentPending) {
          alert(`Payment cannot be more than pending fee. Maximum: ${formatMoney(newStudentPending)}`);
          return;
        }
      }

      const oldStudentPaid = oldStudent ? parseMoney(oldStudent.paidFee) : 0;
      const newStudentPaidBefore = parseMoney(student.paidFee);
      const updatedOldStudentPaid = sameStudent
        ? Math.max(0, oldStudentPaid + amount - oldAmount)
        : Math.max(0, oldStudentPaid - oldAmount);
      const updatedNewStudentPaid = sameStudent
        ? updatedOldStudentPaid
        : Math.max(0, newStudentPaidBefore + amount);
      const updatedTotalPaid = updatedNewStudentPaid;
      const updatedPending = Math.max(0, parseMoney(student.fee) - updatedTotalPaid);

      const updatedPayment = {
        ...editingPayment,
        studentId: student.id,
        student: student.name,
        studentEmail: student.email || editingPayment.studentEmail || "",
        course: student.course,
        batch: student.batch,
        amount,
        date: newPayment.date,
        paidForMonth: newPayment.paidForMonth,
        nextInstallmentDate: newPayment.nextInstallmentDate,
        mode: newPayment.mode,
        reference: newPayment.reference,
        totalPaid: updatedTotalPaid,
        pending: updatedPending,
      };

      const { data, error } = await supabase
        .from("payments")
        .update(paymentToRow(updatedPayment))
        .eq("id", editingPayment.id)
        .select("id, student_id, student, student_email, course, batch, amount, date, paid_for_month, next_installment_date, mode, reference, total_paid, pending, created_at")
        .single();

      if (error) {
        console.error("Payment update error:", error);
        alert(`Could not update payment: ${error.message}`);
        return;
      }

      try {
        if (sameStudent) {
          await updateStudentPaidFeeInSupabase(student.id, updatedTotalPaid);
        } else {
          if (oldStudent) await updateStudentPaidFeeInSupabase(oldStudent.id, updatedOldStudentPaid);
          await updateStudentPaidFeeInSupabase(student.id, updatedNewStudentPaid);
        }
      } catch (error) {
        alert(`Payment saved, but student fee balance could not be updated: ${error.message}`);
      }

      setPayments((items) => items.map((payment) => payment.id === editingPayment.id ? paymentFromRow(data) : payment));
      setStudents((items) => items.map((item) => {
        if (sameStudent && item.id === student.id) return { ...item, paidFee: formatMoney(updatedTotalPaid) };
        if (!sameStudent && oldStudent && item.id === oldStudent.id) return { ...item, paidFee: formatMoney(updatedOldStudentPaid) };
        if (!sameStudent && item.id === student.id) return { ...item, paidFee: formatMoney(updatedNewStudentPaid) };
        return item;
      }));

      setEditingPayment(null);
    } else {
      const pendingBefore = getStudentPending(student);

      if (amount > pendingBefore) {
        alert(`Payment cannot be more than pending fee. Maximum: ${formatMoney(pendingBefore)}`);
        return;
      }

      const newTotalPaid = parseMoney(student.paidFee) + amount;
      const newPending = Math.max(0, parseMoney(student.fee) - newTotalPaid);
      const payment = {
        studentId: student.id,
        student: student.name,
        studentEmail: student.email || "",
        course: student.course,
        batch: student.batch,
        amount,
        date: newPayment.date,
        paidForMonth: newPayment.paidForMonth,
        nextInstallmentDate: newPayment.nextInstallmentDate,
        mode: newPayment.mode,
        reference: newPayment.reference,
        totalPaid: newTotalPaid,
        pending: newPending,
      };

      const { data, error } = await supabase
        .from("payments")
        .insert(paymentToRow(payment))
        .select("id, student_id, student, student_email, course, batch, amount, date, paid_for_month, next_installment_date, mode, reference, total_paid, pending, created_at")
        .single();

      if (error) {
        console.error("Payment insert error:", error);
        alert(`Could not add payment: ${error.message}`);
        return;
      }

      try {
        await updateStudentPaidFeeInSupabase(student.id, newTotalPaid);
      } catch (error) {
        alert(`Payment saved, but student fee balance could not be updated: ${error.message}`);
      }

      setPayments((items) => [paymentFromRow(data), ...items]);
      setStudents((items) => items.map((item) =>
        item.id === student.id ? { ...item, paidFee: formatMoney(newTotalPaid) } : item
      ));
    }

    setNewPayment({
      studentId: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      paidForMonth: new Date().toISOString().slice(0, 7),
      nextInstallmentDate: addOneMonth(new Date().toISOString().split("T")[0]),
      mode: "UPI",
      reference: "",
    });
    setShowPaymentForm(false);
  };

  const handleEditPayment = (payment) => {
    setEditingPayment(payment);
    setNewPayment({
      studentId: String(payment.studentId),
      amount: String(payment.amount),
      date: payment.date,
      paidForMonth: payment.paidForMonth || payment.date?.slice(0, 7) || new Date().toISOString().slice(0, 7),
      nextInstallmentDate: payment.nextInstallmentDate || addOneMonth(payment.date),
      mode: payment.mode,
      reference: payment.reference || "",
    });
    setShowPaymentForm(true);
  };

  const handleDeletePayment = async (payment) => {
    if (!window.confirm(`Delete payment of ${formatMoney(payment.amount)} from ${payment.student}?`)) return;

    const student = students.find((item) => String(item.id) === String(payment.studentId));
    const newPaid = student
      ? Math.max(0, parseMoney(student.paidFee) - parseMoney(payment.amount))
      : null;

    const { error } = await supabase
      .from("payments")
      .delete()
      .eq("id", payment.id);

    if (error) {
      console.error("Payment delete error:", error);
      alert(`Could not delete payment: ${error.message}`);
      return;
    }

    if (student && newPaid !== null) {
      try {
        await updateStudentPaidFeeInSupabase(student.id, newPaid);
      } catch (error) {
        alert(`Payment deleted, but student fee balance could not be updated: ${error.message}`);
      }
    }

    setPayments((items) => items.filter((item) => item.id !== payment.id));
    if (student && newPaid !== null) {
      setStudents((items) => items.map((item) =>
        item.id === student.id ? { ...item, paidFee: formatMoney(newPaid) } : item
      ));
    }
  };


  /* ================= COMMUNICATION ACTIONS ================= */
  const getAnnouncementRecipients = (item) => {
    if (item.targetType === "Staff") return staff.map(m => m.name);
    if (item.targetType === "Course") return students.filter(s => s.course === item.targetValue).map(s => s.name);
    if (item.targetType === "Batch") return students.filter(s => s.batch === item.targetValue).map(s => s.name);
    return students.map(s => s.name);
  };

  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnouncement.title.trim() || !newAnnouncement.message.trim()) {
      alert("Please add announcement title and message.");
      return;
    }
    const payload = {
      ...newAnnouncement,
      id: editingAnnouncement?.id || Date.now(),
      status: "Published",
      createdAt: editingAnnouncement?.createdAt || new Date().toISOString(),
    };
    setAnnouncements(prev => editingAnnouncement ? prev.map(item => item.id === editingAnnouncement.id ? payload : item) : [payload, ...prev]);
    setShowAnnouncementForm(false);
    setEditingAnnouncement(null);
    setNewAnnouncement({ title:"", category:"Holiday", targetType:"All Students", targetValue:"", date:new Date().toISOString().split("T")[0], message:"" });
  };

  const handleEditAnnouncement = (item) => {
    setEditingAnnouncement(item);
    setNewAnnouncement({ title:item.title||"", category:item.category||"Holiday", targetType:item.targetType||"All Students", targetValue:item.targetValue||"", date:item.date||"", message:item.message||"" });
    setShowAnnouncementForm(true);
    setCommunicationTab("Announcements");
  };

  const handleDeleteAnnouncement = (item) => {
    if (!window.confirm(`Delete announcement "${item.title}"?`)) return;
    setAnnouncements(prev => prev.filter(x => x.id !== item.id));
  };

  const getLatestStudentPayment = (studentId) => {
    return [...payments]
      .filter((payment) => String(payment.studentId) === String(studentId))
      .sort((a, b) => {
        const aTime = new Date(a.createdAt || `${a.date || ""}T00:00:00`).getTime() || 0;
        const bTime = new Date(b.createdAt || `${b.date || ""}T00:00:00`).getTime() || 0;
        return bTime - aTime;
      })[0] || null;
  };

  const formatWhatsAppDate = (value) => {
    if (!value) return "";
    const d = new Date(`${value}T00:00:00`);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  };

  const buildWhatsappMessage = (student, template, extra = {}) => {
    if (!student) return "";

    const totalFee = parseMoney(student.fee);
    const currentPaid = parseMoney(student.paidFee);
    const currentPending = getStudentPending(student);

    const latestPayment = getLatestStudentPayment(student.id);
    const amountPaid = latestPayment?.amount || 0;
    const totalPaid = latestPayment?.totalPaid ?? currentPaid;
    const pendingAfterLatest = latestPayment?.pending ?? currentPending;

    const emiAmountRaw = parseMoney(extra.amountDue);
    const emiAmount = Math.min(
      emiAmountRaw > 0 ? emiAmountRaw : currentPending,
      currentPending
    );
    const balanceAfterPayment = Math.max(0, currentPending - emiAmount);

    const templates = {
      "Fee Reminder": `📌 *Fee Payment Reminder – CognitiaX AI*

Dear Student,

This is a gentle reminder that your *course fee payment is due*.

*Course:* ${student.course || "your course"}

*Total Course Fee:* ${formatMoney(totalFee)}

*Amount Paid:* ${formatMoney(amountPaid)}

*Total Paid:* ${formatMoney(currentPaid)}

*Pending:* ${formatMoney(currentPending)}

*Monthly EMI / This Payment:* ${formatMoney(emiAmount)}

*Balance After Payment:* ${formatMoney(balanceAfterPayment)}

We request you to kindly complete the *pending payment* within the due date to ensure your classes and course access continue smoothly.

For any payment-related query or assistance, please feel free to contact the *CognitiaX AI team*.

Thank you for your cooperation. 🙏

*Regards,*
*Team CognitiaX AI*`,

      "Payment Received": `✅ *Fee Payment Received – CognitiaX AI*

Dear Student,

We are pleased to confirm that your *fee payment has been successfully received*.

*Course:* ${student.course || "your course"}

*Total Course Fee:* ${formatMoney(totalFee)}

*Amount Paid:* ${formatMoney(amountPaid)}

*Total Paid:* ${formatMoney(totalPaid)}

*Pending:* ${formatMoney(pendingAfterLatest)}

Your payment has been updated in our records.

We appreciate your continued association with *CognitiaX AI* and wish you the best for your learning journey. 🎓

*Regards,*
*Team CognitiaX AI*`,

      "Holiday Announcement": `📢 *Holiday Notice – CognitiaX AI*

Dear Students,

This is to inform you that *CognitiaX AI will remain closed on 2nd October 2026 (Friday)* on the occasion of *Gandhi Jayanti*. 🇮🇳

Regular classes will resume as per the scheduled timetable from the next working day.

Wishing everyone a peaceful and meaningful *Gandhi Jayanti*. 🙏

*Regards,*
*Team CognitiaX AI*`,

      "Class Update": `📚 *Class Update – CognitiaX AI*

Dear Student,

There is an important update regarding your *${student.batch || "batch"}* class.

Please check the latest communication shared by the *CognitiaX AI team*.

Thank you. 🙏

*Regards,*
*Team CognitiaX AI*`,

      "General Announcement": `📢 *Important Notice – CognitiaX AI*

Dear Student,

Please check the latest announcement shared by *CognitiaX AI*.

For any clarification or assistance, please contact the *CognitiaX AI team*.

Thank you. 🙏

*Regards,*
*Team CognitiaX AI*`,
    };

    return templates[template] || "";
  };

  const getWhatsappSummary = (student, template, amountDue = "") => {
    if (!student) {
      return {
        totalFee: 0,
        amountPaid: 0,
        totalPaid: 0,
        pending: 0,
      };
    }

    const totalFee = parseMoney(student.fee);
    const currentPaid = parseMoney(student.paidFee);
    const currentPending = getStudentPending(student);
    const latestPayment = getLatestStudentPayment(student.id);

    if (template === "Payment Received") {
      return {
        totalFee,
        amountPaid: latestPayment?.amount || 0,
        totalPaid: latestPayment?.totalPaid ?? currentPaid,
        pending: latestPayment?.pending ?? currentPending,
      };
    }

    const emiAmount = Math.min(
      parseMoney(amountDue) || currentPending,
      currentPending
    );

    return {
      totalFee,
      amountPaid: latestPayment?.amount || 0,
      totalPaid: currentPaid,
      pending: currentPending,
      emiAmount,
      balanceAfterPayment: Math.max(0, currentPending - emiAmount),
    };
  };

  const openWhatsappForm = (student = null, template = "Fee Reminder") => {
    setShowPaymentForm(false);
    setEditingPayment(null);
    const studentId = student ? String(student.id) : "";
    const latestPayment = student ? getLatestStudentPayment(student.id) : null;
    const amountDue = student
      ? String(latestPayment?.amount || getStudentPending(student) || "")
      : "";
    setNewWhatsapp({
      studentId,
      template,
      amountDue,
      sendMode: template === "Holiday Announcement" ? "Batch Group" : "Student",
      batchName: template === "Holiday Announcement" ? (student?.batch || "") : "",
      message: student ? buildWhatsappMessage(student, template, { amountDue }) : buildWhatsappMessage({ name: "Students", batch: "" }, template, { amountDue }),
    });
    setShowWhatsappForm(true);
  };

  const copyTextToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        return true;
      } catch {
        return false;
      }
    }
  };

  const handleQueueWhatsapp = async (e) => {
    e.preventDefault();

    const isBatchHoliday =
      newWhatsapp.template === "Holiday Announcement" &&
      newWhatsapp.sendMode === "Batch Group";

    if (isBatchHoliday) {
      const batch = batches.find((item) => item.name === newWhatsapp.batchName);
      if (!batch) {
        alert("Please select a batch.");
        return;
      }

      if (!batch.whatsappGroupLink) {
        alert("This batch does not have a WhatsApp Group Link. Go to Batches → Edit and add the group link.");
        return;
      }

      const message = newWhatsapp.message?.trim() || buildWhatsappMessage({ name: "Students", batch: batch.name }, "Holiday Announcement");
      if (!message) {
        alert("Message is empty.");
        return;
      }

      const copied = await copyTextToClipboard(message);
      window.open(batch.whatsappGroupLink, "_blank");

      const newLog = {
        id: Date.now(),
        student: `${batch.name} Batch`,
        phone: "—",
        template: newWhatsapp.template,
        message,
        date: new Date().toISOString(),
        status: copied
          ? "Opened Batch WhatsApp Group - message copied, press Paste & Send"
          : "Opened Batch WhatsApp Group - paste message and press Send",
      };

      setWhatsappLogs((prev) => {
        const updated = [...prev, newLog];
        localStorage.setItem("whatsappLogs", JSON.stringify(updated));
        return updated;
      });

      setShowWhatsappForm(false);
      setNewWhatsapp({ studentId: "", template: "Fee Reminder", amountDue: "", sendMode: "Student", batchName: "", message: "" });
      return;
    }

    const student = students.find(
      (s) => String(s.id) === String(newWhatsapp.studentId)
    );

    if (!student) {
      alert("Please select a student.");
      return;
    }

    if (!student.phone) {
      alert("Student phone number is missing.");
      return;
    }

    const message =
      newWhatsapp.message?.trim() ||
      buildWhatsappMessage(student, newWhatsapp.template, { amountDue: newWhatsapp.amountDue });

    if (!message) {
      alert("Message is empty.");
      return;
    }

    let phone = String(student.phone).replace(/\D/g, "");
    if (phone.length === 10) phone = "91" + phone;
    if (phone.startsWith("0") && phone.length === 11) phone = "91" + phone.slice(1);

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    const newLog = {
      id: Date.now(),
      student: student.name,
      phone: student.phone,
      template: newWhatsapp.template,
      message,
      date: new Date().toISOString(),
      status: "Opened in WhatsApp - press Send",
    };

    setWhatsappLogs((prev) => {
      const updated = [...prev, newLog];
      localStorage.setItem("whatsappLogs", JSON.stringify(updated));
      return updated;
    });

    setNewWhatsapp({ studentId: "", template: "Fee Reminder", amountDue: "", sendMode: "Student", batchName: "", message: "" });
    setShowWhatsappForm(false);
  };

  /* ================= ADD ADMISSION ================= */

  const handleAddAdmission = async (e) => {

    e.preventDefault();

    if (
      !newAdmission.student ||
      !newAdmission.course ||
      !newAdmission.batch
    ) {
      alert("Please fill all required details!");
      return;
    }

    const admission = {
      student: newAdmission.student,
      course: newAdmission.course,
      batch: newAdmission.batch,
      date: new Date().toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ),
      status: newAdmission.status,
    };

    if (editingAdmission) {
      const { data, error } = await supabase
        .from("admissions")
        .update(admissionToRow(admission))
        .eq("id", editingAdmission.id)
        .select("id, student, course, batch, date, status")
        .single();

      if (error) {
        console.error("Admission update error:", error);
        alert(`Could not update admission: ${error.message}`);
        return;
      }

      setAdmissions((items) =>
        items.map((item) => item.id === editingAdmission.id ? admissionFromRow(data) : item)
      );
      setEditingAdmission(null);
    } else {
      const { data, error } = await supabase
        .from("admissions")
        .insert(admissionToRow(admission))
        .select("id, student, course, batch, date, status")
        .single();

      if (error) {
        console.error("Admission insert error:", error);
        alert(`Could not save admission: ${error.message}`);
        return;
      }

      setAdmissions((items) => [...items, admissionFromRow(data)]);
    }

    setNewAdmission({
      student: "",
      course: "",
      batch: "",
      status: "Confirmed",
    });

    setShowAdmissionForm(false);
  };


  /* ================= DASHBOARD METRICS ================= */
  const dashboardMonth = new Date().toISOString().slice(0, 7);
  const activeStudentsCount = students.filter((s) => s.status === "Active").length;
  const activeBatchesCount = batches.filter((b) => b.status === "Active").length;
  const activeCoursesCount = courses.filter((c) => c.status === "Active").length;
  const activeStaffCount = staff.filter((m) => m.status === "Active").length;
  const pendingStudentsCount = students.filter((s) => getStudentPending(s) > 0).length;
  const monthPayments = payments.filter((p) => String(p.date || "").slice(0, 7) === dashboardMonth);
  const thisMonthCollection = monthPayments.reduce((sum, p) => sum + parseMoney(p.amount), 0);
  const assignedBatchesCount = batches.filter((b) => b.trainer).length;

  const recentPayments = [...payments]
    .sort((a, b) => String(b.date).localeCompare(String(a.date)) || Number(b.id) - Number(a.id))
    .slice(0, 5);

  const pendingStudents = students
    .filter((student) => getStudentPending(student) > 0)
    .sort((a, b) => getStudentPending(b) - getStudentPending(a))
    .slice(0, 5);

  /* ================================================= */
  /* ===================== RETURN ==================== */
  /* ================================================= */

  if (!isAuthenticated) {
    return (
      <Login
        onLogin={(user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (

    <div className="app">


      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="logo">

          <div className="logo-icon">
            C
          </div>

          <div>

            <h2>
              CognitiaX AI
            </h2>

            <span>
              CRM Dashboard
            </span>

          </div>

        </div>


        <div className="menu">

          {menuItems.map((item) => (

            <button

              key={item.label}

              className={
                activeMenu === item.label
                  ? "menu-item active"
                  : "menu-item"
              }

              onClick={() =>
                setActiveMenu(item.label)
              }

            >

              <span className="menu-icon">
                {item.icon}
              </span>

              {item.label}

            </button>

          ))}

        </div>


        <div className="sidebar-bottom">

          <button className="logout-btn" onClick={handleLogout}>

            <IconLogout size={15} />

            Log out

          </button>

        </div>

      </aside>


      {/* ================= MAIN CONTENT ================= */}

      <main className="main-content">

        <style>{`
          /* ===== PREMIUM DASHBOARD ===== */
          .dashboard-page{width:min(100%,1400px);margin:0 auto;padding:4px 0 20px;}
          .dashboard-hero{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin:4px 0 22px;}
          .dashboard-eyebrow{display:inline-flex;align-items:center;gap:7px;padding:7px 11px;border-radius:999px;background:#edf7ef;color:#006100;font-size:12px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;}
          .dashboard-hero h1{margin:12px 0 5px;font-size:30px;line-height:1.15;letter-spacing:-.6px;color:#111827;}
          .dashboard-hero p{margin:0;color:#737987;font-size:14px;}
          .dashboard-date{padding:9px 12px;border:1px solid #e4e7ec;border-radius:10px;background:#fff;color:#667085;font-size:13px;font-weight:700;white-space:nowrap;}
          .dashboard-stat-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:16px;}
          .dashboard-stat-card{display:flex;align-items:center;gap:13px;background:#fff;border:1px solid #e6e9ee;border-radius:16px;padding:17px 16px;box-shadow:0 8px 24px rgba(16,24,40,.04);min-width:0;}
          .dashboard-stat-card>div:last-child{min-width:0;}
          .dashboard-stat-card span{display:block;color:#737987;font-size:12px;font-weight:700;}
          .dashboard-stat-card strong{display:block;color:#111827;font-size:23px;line-height:1.15;margin:5px 0 4px;white-space:nowrap;}
          .dashboard-stat-card small{display:block;color:#98a2b3;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
          .dashboard-stat-icon{width:38px;height:38px;display:grid;place-items:center;border-radius:11px;flex:0 0 38px;font-weight:800;}
          .green-bg{background:#eaf7ee;color:#006100}.blue-bg{background:#eef4ff;color:#315c9e}.gold-bg{background:#fff6df;color:#9b6b00}.red-bg{background:#fff0f0;color:#a33232}
          .dashboard-mini-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:18px;}
          .dashboard-mini-card{border:1px solid #e6e9ee;background:#fff;border-radius:13px;padding:13px 14px;display:flex;align-items:center;gap:10px;text-align:left;cursor:pointer;transition:.18s ease;color:#111827;}
          .dashboard-mini-card:hover{transform:translateY(-1px);box-shadow:0 7px 18px rgba(16,24,40,.06);border-color:#d7dde7;}
          .dashboard-mini-card .mini-icon{width:31px;height:31px;display:grid;place-items:center;border-radius:9px;background:#f2f6f3;color:#006100;flex:0 0 31px;}
          .dashboard-mini-card span:nth-child(2){display:flex;flex-direction:column;min-width:0;flex:1}.dashboard-mini-card small{font-size:11px;color:#8b93a0}.dashboard-mini-card strong{font-size:16px;margin-top:2px;}
          .dashboard-main-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:16px;margin-bottom:16px;}
          .dashboard-panel,.dashboard-progress-panel{background:#fff;border:1px solid #e6e9ee;border-radius:16px;box-shadow:0 8px 24px rgba(16,24,40,.04);overflow:hidden;}
          .dashboard-panel-head{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:17px 18px;border-bottom:1px solid #eef0f3;}
          .dashboard-panel-head h2{margin:0;font-size:18px;line-height:1.2;color:#111827}.dashboard-panel-head p{margin:4px 0 0;font-size:12px;color:#8b93a0;}
          .dashboard-link-btn{border:0;background:transparent;color:#006100;font-weight:800;font-size:12px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;padding:5px 0;}
          .dashboard-list{padding:4px 18px 8px}.dashboard-payment-row,.dashboard-pending-row{display:flex;align-items:center;gap:11px;padding:13px 0;border-bottom:1px solid #f0f2f4;min-width:0}.dashboard-payment-row:last-child,.dashboard-pending-row:last-child{border-bottom:0;}
          .dashboard-avatar{width:34px;height:34px;border-radius:10px;background:#eef3ff;color:#315c9e;display:grid;place-items:center;font-weight:800;font-size:13px;flex:0 0 34px}.dashboard-avatar.light-red{background:#fff1f1;color:#a33232;}
          .dashboard-row-main{min-width:0;flex:1}.dashboard-row-main strong{display:block;font-size:13px;color:#1b2430}.dashboard-row-main span{display:block;margin-top:3px;font-size:11px;color:#9299a6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
          .dashboard-row-right{text-align:right;flex:0 0 auto}.dashboard-row-right strong{display:block;font-size:13px;color:#1b2430}.dashboard-row-right span{display:block;margin-top:3px;font-size:10px;color:#9299a6}.pending-value{color:#a33232!important}.dashboard-small-btn{margin-top:5px;border:1px solid #d9e7dc;background:#f3faf4;color:#006100;border-radius:8px;padding:5px 8px;font-size:10px;font-weight:800;cursor:pointer;}
          .dashboard-empty{padding:28px 0;text-align:center;color:#98a2b3;font-size:13px;}
          .dashboard-bottom-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.dashboard-progress-panel{padding-bottom:8px}.snapshot-row{padding:14px 18px;border-bottom:1px solid #f0f2f4}.snapshot-row:last-child{border-bottom:0}.snapshot-row>div:first-child{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.snapshot-row span{font-size:12px;color:#667085}.snapshot-row strong{font-size:13px;color:#111827}.progress-track{height:7px;border-radius:99px;background:#edf1ef;overflow:hidden}.progress-track span{display:block;height:100%;background:#006100;border-radius:99px}.gold-track span{background:#b48609}.dashboard-quick-card{margin:0;box-shadow:none;border:1px solid #e6e9ee}.quick-action-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}.dashboard-quick-card .quick-btn{margin:0!important;}
          @media (max-width:1050px){.dashboard-stat-grid,.dashboard-mini-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.dashboard-main-grid,.dashboard-bottom-grid{grid-template-columns:1fr;}}
          @media (max-width:640px){
            .dashboard-page{padding-top:0;width:100%;min-width:0}
            .dashboard-hero{align-items:flex-start;flex-direction:column;gap:12px}
            .dashboard-date{align-self:flex-start}
            .dashboard-stat-grid,.dashboard-mini-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important;gap:10px}
            .dashboard-mini-card{min-width:0;width:100%;padding:12px 10px;box-sizing:border-box}
            .quick-action-grid{grid-template-columns:1fr 1fr}
            .dashboard-hero h1{font-size:25px;}
          }

          /* ===== MOBILE TABLE SCROLL ===== */
          .students-data-scroll{
            width:100%;
            max-width:100%;
            overflow-x:auto;
            overflow-y:hidden;
            -webkit-overflow-scrolling:touch;
            scrollbar-width:thin;
            box-sizing:border-box;
          }
          .students-data-scroll table{
            min-width:1050px !important;
            width:1050px;
          }
          .students-data-scroll::-webkit-scrollbar{height:6px;}

          /* ===== ADMISSIONS TABLE SCROLL ===== */
          .admissions-table-card{
            width:100%;
            max-width:100%;
            overflow:hidden !important;
          }

          .admissions-data-scroll{
            width:100%;
            max-width:100%;
            overflow-x:auto;
            overflow-y:hidden;
            -webkit-overflow-scrolling:touch;
            scrollbar-width:thin;
            box-sizing:border-box;
            touch-action:pan-x;
            overscroll-behavior-x:contain;
          }

          .admissions-data-scroll table{
            min-width:900px !important;
            width:900px !important;
            max-width:none !important;
            table-layout:auto;
          }

          .admissions-data-scroll th,
          .admissions-data-scroll td{
            white-space:nowrap;
          }

          .admissions-data-scroll::-webkit-scrollbar{
            height:6px;
          }

          .admissions-data-scroll::-webkit-scrollbar-thumb{
            border-radius:10px;
          }

          @media (max-width:640px){
            .admissions-data-scroll{
              width:100%;
              max-width:100%;
              overflow-x:auto !important;
              overflow-y:hidden;
              -webkit-overflow-scrolling:touch;
              touch-action:pan-x;
            }

            .admissions-data-scroll table{
              min-width:900px !important;
              width:900px !important;
            }

            .admissions-data-scroll th,
            .admissions-data-scroll td{
              white-space:nowrap !important;
              padding:12px 14px !important;
            }

            .admissions-data-scroll .student-name{
              min-width:170px;
              white-space:nowrap !important;
            }
          }

          /* ===== GLOBAL APP CONTENT ALIGNMENT ===== */
          .main-content {
            min-width: 0;
            overflow-x: hidden;
            box-sizing: border-box;
            padding-left: 28px !important;
            padding-right: 28px !important;
            padding-bottom: 36px !important;
          }

          .main-content > .students-page,
          .main-content > .coming-soon {
            width: min(100%, 1400px) !important;
            max-width: 1400px !important;
            margin: 0 auto !important;
            box-sizing: border-box;
          }

          .main-content > .students-page {
            min-width: 0;
          }

          /* Consistent page header */
          .main-content > .students-page > .page-actions {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
            margin: 0 0 20px !important;
            padding: 0 !important;
          }

          .main-content > .students-page > .page-actions > div {
            min-width: 0;
          }

          .main-content > .students-page > .page-actions h2 {
            margin: 0 !important;
            font-size: 27px !important;
            line-height: 1.2 !important;
            font-weight: 750 !important;
            letter-spacing: -0.4px;
          }

          .main-content > .students-page > .page-actions p {
            margin: 6px 0 0 !important;
            font-size: 14px !important;
            line-height: 1.45 !important;
            color: #737987 !important;
          }

          .main-content > .students-page > .page-actions .add-student-btn {
            flex: 0 0 auto;
            min-height: 46px;
            padding: 0 18px !important;
            border-radius: 10px !important;
          }

          /* Forms */
          .students-page .student-form-card {
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            margin: 0 0 18px !important;
            padding: 22px !important;
            border-radius: 16px !important;
            overflow: hidden;
          }

          .students-page .form-header {
            margin-bottom: 18px !important;
          }

          .students-page .form-grid {
            align-items: start;
            gap: 16px !important;
          }

          /* Cards / tables */
          .students-page .students-table-card {
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            overflow: hidden;
            margin: 0 0 18px !important;
            border-radius: 16px !important;
          }

          .students-page .card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            flex-wrap: wrap;
            padding: 18px 20px !important;
          }

          .students-page .card-header h2,
          .students-page .card-header h3 {
            margin: 0 !important;
            font-size: 19px !important;
            line-height: 1.25 !important;
          }

          .students-page .card-header p {
            margin: 4px 0 0 !important;
            font-size: 13px !important;
            color: #7a808b !important;
          }

          .students-page .students-table-card > div[style*="overflowX"] {
            width: 100%;
            max-width: 100%;
            overflow-x: auto !important;
          }

          .students-page table {
            width: 100%;
            min-width: 900px;
            table-layout: auto;
            border-collapse: collapse;
          }

          .students-page th,
          .students-page td {
            vertical-align: middle;
            white-space: nowrap;
            padding: 13px 14px !important;
            height: 52px;
            box-sizing: border-box;
          }

          .students-page th {
            font-size: 12px !important;
            font-weight: 700 !important;
            letter-spacing: 0.1px;
          }

          .students-page td {
            font-size: 14px !important;
          }

          .students-page th:first-child,
          .students-page td:first-child {
            white-space: normal;
          }

          .students-page .student-name {
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 160px;
          }

          .students-page .action-btn {
            min-height: 36px;
            padding: 0 12px !important;
            border-radius: 9px !important;
            white-space: nowrap;
          }

          /* Keep controls aligned and compact */
          .students-page .card-header input,
          .students-page .card-header select {
            height: 40px !important;
            box-sizing: border-box;
          }

          /* Stats */
          .students-page .stats-grid {
            gap: 14px !important;
            margin-bottom: 18px !important;
          }

          /* Prevent giant empty vertical gaps */
          .students-page > *:first-child {
            margin-top: 0 !important;
          }

          @media (max-width: 1100px) {
            .main-content {
              padding-left: 20px !important;
              padding-right: 20px !important;
            }
            .students-page table { min-width: 820px; }
          }

          @media (max-width: 720px) {
            .main-content {
              padding-left: 14px !important;
              padding-right: 14px !important;
            }
            .main-content > .students-page > .page-actions {
              align-items: stretch;
            }
            .main-content > .students-page > .page-actions > div {
              width: 100%;
            }
            .main-content > .students-page > .page-actions button {
              width: fit-content;
              align-self: flex-start;
            }
            .students-page .student-form-card {
              padding: 16px !important;
            }
          }

          @media (max-width:640px) {
            .students-page .students-table-card {
              width:100% !important;
              max-width:100% !important;
              overflow:hidden !important;
            }

            .students-data-scroll {
              display:block;
              width:100%;
              max-width:100%;
              overflow-x:auto !important;
              overflow-y:hidden;
              -webkit-overflow-scrolling:touch;
              touch-action:pan-x;
            }

            .students-data-scroll table {
              min-width:1050px !important;
              width:1050px !important;
              table-layout:auto !important;
            }
          }

          /* =====================================================
             FINAL MOBILE POLISH
             ===================================================== */

          /* =====================================================
             RESPONSIVE DASHBOARD NUMBERS
             Large fee amounts must shrink/wrap safely instead of
             pushing the card or viewport wider.
             ===================================================== */

          .dashboard-stat-card {
            min-width: 0;
            max-width: 100%;
            overflow: hidden;
            box-sizing: border-box;
          }

          .dashboard-stat-card > div:last-child {
            min-width: 0;
            max-width: 100%;
          }

          .dashboard-stat-card strong {
            display: block;
            min-width: 0;
            max-width: 100%;
            overflow-wrap: anywhere;
            word-break: break-word;
            font-variant-numeric: tabular-nums;
          }

          @media (max-width: 640px) {
            .dashboard-stat-grid {
              width: 100% !important;
              max-width: 100% !important;
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              gap: 10px !important;
            }

            .dashboard-stat-card {
              width: 100% !important;
              min-width: 0 !important;
              padding: 14px 12px !important;
              gap: 9px !important;
            }

            .dashboard-stat-card > div:last-child {
              flex: 1 1 auto;
              width: 0;
              min-width: 0 !important;
            }

            .dashboard-stat-card strong {
              font-size: clamp(17px, 5vw, 24px) !important;
              line-height: 1.12 !important;
              letter-spacing: -0.3px;
              white-space: normal !important;
            }

            .dashboard-stat-card span {
              display: block;
              min-width: 0;
              font-size: 11px !important;
              line-height: 1.2 !important;
            }

            .dashboard-stat-card small {
              display: block;
              min-width: 0;
              font-size: 10px !important;
              line-height: 1.25 !important;
              overflow-wrap: anywhere;
            }

            .dashboard-stat-icon {
              flex: 0 0 36px !important;
              width: 36px !important;
              height: 36px !important;
            }
          }

          @media (max-width: 380px) {
            .dashboard-stat-grid {
              gap: 8px !important;
            }

            .dashboard-stat-card {
              padding: 12px 9px !important;
              gap: 7px !important;
            }

            .dashboard-stat-card strong {
              font-size: clamp(15px, 4.8vw, 20px) !important;
            }

            .dashboard-stat-card span {
              font-size: 10px !important;
            }

            .dashboard-stat-card small {
              font-size: 9px !important;
            }

            .dashboard-stat-icon {
              flex-basis: 32px !important;
              width: 32px !important;
              height: 32px !important;
            }
          }

          /* =====================================================
             GLOBAL MOBILE OVERFLOW / SCREEN STABILITY
             Prevent the whole app from moving horizontally.
             Internal tables/cards keep their own horizontal scroll.
             ===================================================== */

          html,
          body,
          #root {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            margin: 0;
            overflow-x: hidden !important;
          }

          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          .app,
          .app-shell,
          .main-content {
            min-width: 0 !important;
            max-width: 100% !important;
          }

          .main-content {
            overflow-x: hidden !important;
            overflow-y: visible !important;
            overscroll-behavior-x: none;
          }

          @media (max-width: 640px) {

            /* Never allow normal page content to create horizontal overflow */
            .main-content {
              width: 100% !important;
              max-width: 100vw !important;
              padding-left: 12px !important;
              padding-right: 12px !important;
              overflow-x: clip !important;
            }

            .main-content > * {
              min-width: 0 !important;
              max-width: 100% !important;
            }

            /* Header itself must stay inside viewport */
            .header {
              width: 100% !important;
              max-width: 100% !important;
              overflow: hidden !important;
            }

            /* Dashboard */
            .dashboard-page,
            .dashboard-hero,
            .dashboard-main-grid,
            .dashboard-bottom-grid,
            .dashboard-stat-grid,
            .dashboard-mini-grid {
              min-width: 0 !important;
              max-width: 100% !important;
            }

            /* Cards and normal sections */
            .students-page,
            .students-page > *,
            .students-table-card,
            .student-form-card {
              min-width: 0 !important;
              max-width: 100% !important;
            }

            /*
              IMPORTANT:
              Only these dedicated wrappers may scroll horizontally.
              The viewport/page itself will not scroll sideways.
            */
            .table-scroll-wrapper,
            .students-page .students-table-card > div[style*="overflowX"],
            .courses-list-scroll {
              overscroll-behavior-x: contain;
              scrollbar-gutter: stable;
            }

            /* Courses page wrapper */
            .courses-list-scroll {
              overflow-x: auto !important;
              overflow-y: hidden !important;
              max-width: 100% !important;
              min-width: 0 !important;
              touch-action: pan-x !important;
              -webkit-overflow-scrolling: touch;
            }

            /* Do not let the wide course card escape its scroll container */
            .course-item-card {
              flex: 0 0 900px !important;
            }

            /* Tables scroll inside their card only */
            .students-page .students-table-card {
              overflow: hidden !important;
              max-width: 100% !important;
            }

            .students-page .table-scroll-wrapper,
            .students-page .students-table-card > div[style*="overflowX"] {
              width: 100% !important;
              max-width: 100% !important;
              overflow-x: auto !important;
              overflow-y: hidden !important;
              touch-action: pan-x !important;
              -webkit-overflow-scrolling: touch;
              overscroll-behavior-x: contain;
            }

            .students-page table {
              max-width: none !important;
            }

            /* Text cannot force the page wider */
            .students-page h1,
            .students-page h2,
            .students-page h3,
            .students-page p,
            .dashboard-page h1,
            .dashboard-page h2,
            .dashboard-page p {
              max-width: 100%;
            }

            /* Keep buttons/inputs inside viewport */
            input,
            select,
            textarea,
            button {
              max-width: 100%;
            }
          }

          @media (max-width: 640px) {

            /* Header: title/subtitle centered, controls stay left/right without overlap */
            .header {
              position: relative !important;
              width: 100%;
              min-height: 132px;
              display: flex !important;
              flex-direction: column !important;
              align-items: center !important;
              justify-content: flex-start !important;
              text-align: center !important;
              padding: 8px 0 10px !important;
              box-sizing: border-box;
            }

            .header > div:first-child {
              width: 100% !important;
              min-width: 0 !important;
              text-align: center !important;
              display: flex !important;
              flex-direction: column !important;
              align-items: center !important;
              justify-content: center !important;
              padding: 0 !important;
              box-sizing: border-box;
              order: 1 !important;
            }

            .header > div:first-child h1 {
              width: 100% !important;
              margin: 0 !important;
              text-align: center !important;
              font-size: 27px !important;
              line-height: 1.15 !important;
              white-space: nowrap;
            }

            .header > div:first-child p {
              width: 100% !important;
              max-width: 100% !important;
              margin: 5px 0 0 !important;
              text-align: center !important;
              font-size: 12px !important;
              line-height: 1.25 !important;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .header-right {
              position: absolute !important;
              left: 0 !important;
              right: 0 !important;
              bottom: 10px !important;
              width: 100% !important;
              height: 44px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: space-between !important;
              pointer-events: none;
              box-sizing: border-box;
            }

            .header-right .notification {
              position: relative !important;
              transform: none !important;
              margin: 0 !important;
              pointer-events: auto;
              flex: 0 0 auto;
              z-index: 2;
            }

            /* Keep notification badge attached to the bell, never the header */
            .header-right .notification::after,
            .header-right .notification::before {
              position: absolute !important;
            }

            /* Keep notification badge attached to the bell, never the header */
            .header-right .notification::after,
            .header-right .notification::before {
              position: absolute !important;
            }

            .header-right .profile {
              position: static !important;
              transform: none !important;
              margin: 0 !important;
              pointer-events: auto;
              flex: 0 0 auto;
              max-width: 155px;
              z-index: 2;
              z-index: 2;
            }

            .header-right .profile > div:last-child {
              min-width: 0;
            }

            .header-right .profile strong {
              display: block;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .header-right .profile span {
              display: block;
              white-space: nowrap;
            }

            /* Center page-action headings */
            .main-content > .students-page > .page-actions {
              justify-content: center !important;
              align-items: center !important;
              text-align: center !important;
            }

            .main-content > .students-page > .page-actions > div {
              width: 100% !important;
              text-align: center !important;
            }

            .main-content > .students-page > .page-actions h2,
            .main-content > .students-page > .page-actions p {
              text-align: center !important;
            }

            .main-content > .students-page > .page-actions button {
              align-self: center !important;
            }

            /* =================================================
               COURSES - HORIZONTAL SWIPE
               ================================================= */

            .courses-list-scroll {
              width: 100%;
              max-width: 100%;
              overflow-x: auto;
              overflow-y: hidden;
              -webkit-overflow-scrolling: touch;
              touch-action: pan-x;
              scrollbar-width: thin;
              padding-bottom: 4px;
              box-sizing: border-box;
            }

            .courses-list-scroll::-webkit-scrollbar {
              height: 5px;
            }

            .course-item-card {
              min-width: 900px !important;
              width: 900px !important;
              max-width: none !important;
              flex: 0 0 900px !important;
              box-sizing: border-box;
            }

            /* Keep the course content readable while swiping */
            .course-item-card > div:first-child {
              min-width: 870px !important;
            }

            /* Courses search/filter becomes clean on mobile */
            .courses-filter-card {
              width: 100%;
              box-sizing: border-box;
              justify-content: center !important;
              text-align: center;
              padding: 14px !important;
            }

            .courses-filter-card > div:first-child {
              width: 100%;
              text-align: center;
            }

            .courses-filter-card > div:last-child {
              width: 100%;
              display: flex !important;
              justify-content: center !important;
              flex-wrap: nowrap !important;
            }

            .courses-filter-card input {
              width: calc(100% - 82px) !important;
              min-width: 0 !important;
            }

            .courses-filter-card select {
              width: 74px !important;
              flex: 0 0 74px;
            }

            /* =================================================
               FEES - COMPACT MOBILE STATS
               ================================================= */

            .fees-stats-grid {
              display: grid !important;
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
              gap: 7px !important;
              margin-bottom: 12px !important;
            }

            .fees-stats-grid .stat-card {
              min-width: 0 !important;
              min-height: 0 !important;
              height: auto !important;
              padding: 10px 8px !important;
              border-radius: 11px !important;
              gap: 6px !important;
              box-sizing: border-box;
            }

            .fees-stats-grid .stat-icon {
              width: 30px !important;
              height: 30px !important;
              min-width: 30px !important;
              border-radius: 8px !important;
              font-size: 15px !important;
            }

            .fees-stats-grid .stat-card p {
              margin: 0 0 3px !important;
              font-size: 10px !important;
              line-height: 1.15 !important;
            }

            .fees-stats-grid .stat-card h2 {
              margin: 0 !important;
              font-size: 16px !important;
              line-height: 1.1 !important;
              white-space: nowrap;
            }

            /* Keep all three fee cards on one row */
            .fees-stats-grid .stat-card:last-child {
              grid-column: auto !important;
              justify-self: stretch;
            }

            /* Reduce card spacing across mobile pages */
            .students-page .students-table-card {
              margin-bottom: 12px !important;
            }

            .students-page .card-header {
              padding: 14px 15px !important;
            }
          }

          @media (max-width: 380px) {

            .header > div:first-child h1 {
              font-size: 24px !important;
            }

            .header {
              min-height: 126px;
            }

            .header > div:first-child p {
              max-width: 155px !important;
              font-size: 10px !important;
            }

            .header-right .profile {
              max-width: 125px;
            }

            .header-right .profile strong {
              font-size: 13px !important;
            }

            .header-right .profile span {
              font-size: 11px !important;
            }

            .fees-stats-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
              gap: 5px !important;
            }

            .fees-stats-grid .stat-card {
              padding: 8px 6px !important;
            }

            .fees-stats-grid .stat-card h2 {
              font-size: 14px !important;
            }

            .fees-stats-grid .stat-card p {
              font-size: 9px !important;
            }
          }

        `}</style>

        {/* ================= HEADER ================= */}

        <header className="header">

          <div>

            <h1>
              {activeMenu}
            </h1>

            <p>
              Welcome back! Here's what's happening today.
            </p>

          </div>


          <div className="header-right">

            <button className="notification">

              <IconBell size={17} />

            </button>


            <div className="profile">

              <div className="avatar">
                {(currentUser?.name || "U").charAt(0).toUpperCase()}
              </div>


              <div>

                <strong>
                  {currentUser?.name || "User"}
                </strong>

                <span>
                  {currentUser?.role || "User"}
                </span>

              </div>

            </div>

          </div>

        </header>


        {/* ================================================= */}
        {/* ================= DASHBOARD ===================== */}
        {/* ================================================= */}

        {activeMenu === "Dashboard" && (
          <div className="dashboard-page">
            <div className="dashboard-hero">
              <div>
                <span className="dashboard-eyebrow"><IconSparkle size={14} /> Institute Overview</span>
                <h1>Good to see you, Imran.</h1>
                <p>Here is the latest snapshot of your students, admissions, payments, courses and team.</p>
              </div>
              <div className="dashboard-date">{new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</div>
            </div>

            <section className="dashboard-stat-grid">
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-icon green-bg"><IconUsers size={20} /></div>
                <div><span>Total Students</span><strong>{students.length}</strong><small>{activeStudentsCount} active students</small></div>
              </div>
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-icon blue-bg"><IconClipboard size={20} /></div>
                <div><span>Admissions</span><strong>{admissions.length}</strong><small>{activeBatchesCount} active batches</small></div>
              </div>
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-icon gold-bg">₹</div>
                <div><span>Total Collected</span><strong>{formatMoney(getPaidFees())}</strong><small>{formatMoney(thisMonthCollection)} this month</small></div>
              </div>
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-icon red-bg"><IconClock size={20} /></div>
                <div><span>Pending Fees</span><strong>{formatMoney(getPendingFees())}</strong><small>{pendingStudentsCount} students pending</small></div>
              </div>
            </section>

            <section className="dashboard-mini-grid">
              <button className="dashboard-mini-card" onClick={() => setActiveMenu("Courses")}>
                <span className="mini-icon"><IconBook size={17} /></span><span><small>Courses</small><strong>{courses.length}</strong></span><IconArrowRight size={15} />
              </button>
              <button className="dashboard-mini-card" onClick={() => setActiveMenu("Batches")}>
                <span className="mini-icon"><IconUsers size={17} /></span><span><small>Batches</small><strong>{batches.length}</strong></span><IconArrowRight size={15} />
              </button>
              <button className="dashboard-mini-card" onClick={() => setActiveMenu("Staff")}>
                <span className="mini-icon"><IconUsers size={17} /></span><span><small>Staff</small><strong>{staff.length}</strong></span><IconArrowRight size={15} />
              </button>
              <button className="dashboard-mini-card" onClick={() => setActiveMenu("Attendance")}>
                <span className="mini-icon"><IconCheck size={17} /></span><span><small>Attendance</small><strong>{attendanceRecords.filter((r) => String(r.date || "").slice(0,7) === dashboardMonth).length}</strong></span><IconArrowRight size={15} />
              </button>
            </section>

            <section className="dashboard-main-grid">
              <div className="dashboard-panel">
                <div className="dashboard-panel-head">
                  <div><h2>Recent Payments</h2><p>Latest fee collections</p></div>
                  <button className="dashboard-link-btn" onClick={() => setActiveMenu("Payments")}>View all <IconArrowRight size={14} /></button>
                </div>
                <div className="dashboard-list">
                  {recentPayments.length ? recentPayments.map((payment) => (
                    <div className="dashboard-payment-row" key={payment.id}>
                      <div className="dashboard-avatar">{String(payment.student || "S").charAt(0).toUpperCase()}</div>
                      <div className="dashboard-row-main"><strong>{payment.student}</strong><span>{payment.course || "No course"} • {payment.batch || "No batch"}</span></div>
                      <div className="dashboard-row-right"><strong>{formatMoney(payment.amount)}</strong><span>{payment.date}</span></div>
                    </div>
                  )) : <div className="dashboard-empty">No payments recorded yet.</div>}
                </div>
              </div>

              <div className="dashboard-panel">
                <div className="dashboard-panel-head">
                  <div><h2>Pending Fees</h2><p>Students that need attention</p></div>
                  <button className="dashboard-link-btn" onClick={() => setActiveMenu("Fees")}>Open fees <IconArrowRight size={14} /></button>
                </div>
                <div className="dashboard-list">
                  {pendingStudents.length ? pendingStudents.map((student) => (
                    <div className="dashboard-pending-row" key={student.id}>
                      <div className="dashboard-avatar light-red">{student.name.charAt(0).toUpperCase()}</div>
                      <div className="dashboard-row-main"><strong>{student.name}</strong><span>{student.course || "No course"} • {student.batch || "No batch"}</span></div>
                      <div className="dashboard-row-right"><strong className="pending-value">{formatMoney(getStudentPending(student))}</strong><button className="dashboard-small-btn" onClick={() => { setActiveMenu("Payments"); openPaymentForm(student); }}>Collect</button></div>
                    </div>
                  )) : <div className="dashboard-empty">All student fees are cleared.</div>}
                </div>
              </div>
            </section>

            <section className="dashboard-bottom-grid">
              <div className="dashboard-progress-panel">
                <div className="dashboard-panel-head"><div><h2>Institute Snapshot</h2><p>Current operational picture</p></div></div>
                <div className="snapshot-row"><div><span>Active Courses</span><strong>{activeCoursesCount}</strong></div><div className="progress-track"><span style={{width:`${courses.length ? (activeCoursesCount/courses.length)*100 : 0}%`}} /></div></div>
                <div className="snapshot-row"><div><span>Active Students</span><strong>{activeStudentsCount}</strong></div><div className="progress-track"><span style={{width:`${students.length ? (activeStudentsCount/students.length)*100 : 0}%`}} /></div></div>
                <div className="snapshot-row"><div><span>Assigned Trainers</span><strong>{assignedBatchesCount}</strong></div><div className="progress-track gold-track"><span style={{width:`${batches.length ? (assignedBatchesCount/batches.length)*100 : 0}%`}} /></div></div>
              </div>

              <div className="quick-card dashboard-quick-card">
                <h2>Quick Actions</h2>
                <p>Create common CRM records without leaving the dashboard.</p>
                <div className="quick-action-grid">
                  <button className="quick-btn" onClick={() => { setActiveMenu("Students"); setShowStudentForm(true); }}><span><IconPlus size={14} /></span> Add Student</button>
                  <button className="quick-btn" onClick={() => { setActiveMenu("Admissions"); setShowAdmissionForm(true); }}><span><IconClipboard size={14} /></span> New Admission</button>
                  <button className="quick-btn" onClick={() => { setActiveMenu("Payments"); openPaymentForm(); }}><span>₹</span> Add Payment</button>
                  <button className="quick-btn" onClick={() => setActiveMenu("Attendance")}><span><IconCheck size={14} /></span> Attendance</button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================================================= */}
        {/* ================= STUDENTS ====================== */}
        {/* ================================================= */}

        {activeMenu === "Students" && (

          <div className="students-page">


            <div className="page-actions">

              <div className="search-box">

                <IconSearch size={16} />

                <input

                  type="text"

                  placeholder="Search by name, phone or course..."

                  value={searchTerm}

                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }

                />

              </div>


              <button

                className="add-student-btn"

                onClick={() =>
                  setShowStudentForm(true)
                }

              >

                <IconPlus size={15} />

                Add Student

              </button>

            </div>


            {/* STUDENT FORM */}

            {showStudentForm && (

              <div className="student-form-card">


                <div className="form-header">

                  <h2>
                    Add New Student
                  </h2>


                  <button

                    className="close-btn"

                    onClick={() =>
                      setShowStudentForm(false)
                    }

                  >

                    <IconClose size={15} />

                  </button>

                </div>


                <form onSubmit={handleAddStudent}>


                  <div className="form-grid">


                    <div className="form-group">

                      <label>
                        Student Name *
                      </label>

                      <input

                        type="text"

                        placeholder="Enter student name"

                       value={newStudent.name}

                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            name: e.target.value,
                          })
                        }

                      />

                    </div>


                    <div className="form-group">

                      <label>
                        Phone Number *
                      </label>

                      <input

                        type="text"

                        placeholder="Enter phone number"

                        value={newStudent.phone}

                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            phone: e.target.value,
                          })
                        }

                      />

                    </div>


                    <div className="form-group">

                      <label>
                        Email
                      </label>

                      <input
                        type="email"
                        placeholder="student@email.com"
                        value={newStudent.email}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            email: e.target.value,
                          })
                        }
                      />

                    </div>


                    <div className="form-group">

                      <label>
                        Course *
                      </label>

                      <select
                        value={newStudent.course}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            course: e.target.value,
                            batch: "",
                          })
                        }
                      >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                          <option key={course.id} value={course.name}>
                            {course.name}
                          </option>
                        ))}
                        {editingStudent &&
                          newStudent.course &&
                          !courses.some((course) => course.name === newStudent.course) && (
                            <option value={newStudent.course}>{newStudent.course}</option>
                          )}
                      </select>

                    </div>


                    <div className="form-group">

                      <label>
                        Batch *
                      </label>

                      <select
                        value={newStudent.batch}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            batch: e.target.value,
                          })
                        }
                        disabled={!newStudent.course}
                      >
                        <option value="">
                          {newStudent.course ? "Select Batch" : "Select Course First"}
                        </option>
                        {getCourseBatches(newStudent.course).map((batch) => (
                          <option key={batch.id} value={batch.name}>
                            {batch.name} — {batch.timing || "Timing not set"}
                          </option>
                        ))}
                        {editingStudent &&
                          newStudent.batch &&
                          !getCourseBatches(newStudent.course).some((batch) => batch.name === newStudent.batch) && (
                            <option value={newStudent.batch}>{newStudent.batch} (Current)</option>
                          )}
                      </select>
                      {newStudent.course && getCourseBatches(newStudent.course).length === 0 && (
                        <small style={{ color: "#b45309", display: "block", marginTop: 6 }}>
                          No batch created for this course yet. Create a batch first.
                        </small>
                      )}

                    </div>


                    <div className="form-group">

                      <label>
                        Total Fees
                      </label>

                      <input

                        type="text"

                        placeholder="Example: ₹40,000"

                        value={newStudent.fee}

                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            fee: e.target.value,
                          })
                        }

                      />

                    </div>
<div className="form-group">
  <label>
    Paid Fees
  </label>

  <input
    type="text"
    placeholder="Example: ₹20,000"
    value={newStudent.paidFee}
    onChange={(e) =>
      setNewStudent({
        ...newStudent,
        paidFee: e.target.value,
      })
    }
  />
</div>
                  </div>


                  <div className="form-buttons">


                    <button

                      type="button"

                      className="cancel-btn"

                      onClick={() =>
                        setShowStudentForm(false)
                      }

                    >

                      Cancel

                    </button>


                   <button
  type="submit"
  className="save-btn"
>
  Save Student
</button>


                  </div>


                </form>


              </div>

            )}


            {/* STUDENTS TABLE */}

            <div className="students-table-card">


              <div className="card-header">

                <div>

                  <h2>
                    All Students
                  </h2>

                  <p>
                    Total {filteredStudents.length} students
                  </p>

                </div>

              </div>


              <div className="students-data-scroll">

              <table>


                <thead>

                  <tr>

                    <th>
                      Student
                    </th>

                    <th>
                      Phone
                    </th>

                    <th>
                      Course
                    </th>

                    <th>
                      Batch
                    </th>

                    <th>
                      Status
                    </th>

                   <th>
  Total Fees
</th>

<th>
  Paid Fees
</th>

<th>
  Pending Fees
</th>

<th>
  Actions
</th>

</tr>

                </thead>


                <tbody>

                  {filteredStudents.map((student) => (

                    <tr key={student.id}>


                      <td>

                        <div className="student-name">

                          <div className="student-avatar">

                            {student.name.charAt(0)}

                          </div>

                          {student.name}

                        </div>

                      </td>


                      <td>
                        {student.phone}
                      </td>


                      <td>
                        {student.course}
                      </td>


                      <td>
                        {student.batch}
                      </td>


                      <td>

                        <span

                          className={
                            student.status === "Active"
                              ? "status active-status"
                              : "status pending-status"
                          }

                        >

                          {student.status}

                        </span>

                      </td>


                      <td>
  {student.fee || "₹0"}
</td>

<td>
  {student.paidFee || "₹0"}
</td>

<td>
  ₹{(
    Number(String(student.fee || 0).replace(/[₹,]/g, "")) -
    Number(String(student.paidFee || 0).replace(/[₹,]/g, ""))
  ).toLocaleString("en-IN")}
</td>
<td>
  <button
  className="action-btn"
  onClick={() => handleEditStudent(student)}
>
  Edit
</button>

  <button
    className="action-btn delete-btn"
    onClick={async () => {
      if (window.confirm(`Delete ${student.name}?`)) {
        const { error } = await supabase
          .from("students")
          .delete()
          .eq("id", student.id);

        if (error) {
          console.error("Student delete error:", error);
          alert(`Could not delete student: ${error.message}`);
          return;
        }

        setStudents((items) => items.filter((item) => item.id !== student.id));
      }
    }}
  >
    Delete
  </button>
</td>

                    </tr>

                  ))}

                </tbody>


              </table>

              </div>


            </div>


          </div>

        )}


        {/* ================================================= */}
        {/* ================= COURSES ======================= */}

        {activeMenu === "Courses" && (
          <div style={{ maxWidth: 1280, margin: "0 auto", paddingBottom: 28 }}>
            {/* Compact Header */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
              marginBottom: 16, padding: "14px 16px", border: "1px solid #e7ebe7",
              borderRadius: 14, background: "#fff", boxShadow: "0 4px 14px rgba(18,30,22,.035)", flexWrap: "wrap"
            }}>
              <div style={{ minWidth: 220 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, color: "#0b5d2a", fontSize: 11, fontWeight: 800, letterSpacing: ".04em", marginBottom: 4 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0b5d2a" }} />
                  TRAINING PROGRAMS
                </div>
                <h2 style={{ margin: 0, fontSize: 21, lineHeight: 1.15 }}>Manage Courses</h2>
                <p style={{ margin: "4px 0 0", color: "#7a808a", fontSize: 12 }}>Programs, pricing, batches and enrolment.</p>
              </div>
              <button className="add-student-btn" style={{ padding: "10px 14px", minHeight: 40 }} onClick={() => {
                setEditingCourse(null);
                setNewCourse({ name: "", duration: "", fee: "", mode: "Offline", description: "", status: "Active" });
                setShowCourseForm(true);
              }}>
                <IconPlus size={14} /> Add Course
              </button>
            </div>

            {/* Compact Summary */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 10, marginBottom: 14 }}>
              {[
                ["Courses", courses.length, "Total", "#0b5d2a"],
                ["Active", courses.filter((c) => c.status === "Active").length, "Running", "#217a4b"],
                ["Batches", batches.length, "All courses", "#8a6a12"],
                ["Students", students.filter((s) => courses.some((c) => c.name === s.course)).length, "Enrolled", "#315b91"],
              ].map(([label, value, sub, accent]) => (
                <div key={label} style={{
                  background: "#fff", border: "1px solid #e7e9e5", borderRadius: 12, padding: "13px 14px",
                  boxShadow: "0 3px 12px rgba(20,30,20,.03)", position: "relative", overflow: "hidden", minWidth: 0
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: accent }} />
                  <div style={{ color: "#7c828c", fontSize: 11, fontWeight: 700 }}>{label}</div>
                  <div style={{ marginTop: 2, fontSize: 24, fontWeight: 800, lineHeight: 1.05, color: "#141821" }}>{value}</div>
                  <div style={{ marginTop: 3, color: "#9a9eaa", fontSize: 10 }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Add / Edit Course */}
            {showCourseForm && (
              <div style={{
                background: "#fff", border: "1px solid #e4e8e2", borderRadius: 14,
                padding: 18, marginBottom: 14, boxShadow: "0 8px 22px rgba(18,30,22,.055)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 18 }}>{editingCourse ? "Edit Course" : "Create New Course"}</h3>
                    <p style={{ margin: "4px 0 0", color: "#80858f", fontSize: 12 }}>Enter the course details.</p>
                  </div>
                  <button className="close-btn" onClick={() => { setShowCourseForm(false); setEditingCourse(null); }}><IconClose size={14} /></button>
                </div>
                <form onSubmit={handleAddCourse}>
                  <div className="form-grid">
                    <div className="form-group"><label>Course Name *</label><input type="text" placeholder="e.g. Data Analytics" value={newCourse.name} onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} /></div>
                    <div className="form-group"><label>Duration *</label><input type="text" placeholder="e.g. 6 Months" value={newCourse.duration} onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })} /></div>
                    <div className="form-group"><label>Course Fee *</label><input type="number" min="0" placeholder="Enter fee" value={newCourse.fee} onChange={(e) => setNewCourse({ ...newCourse, fee: e.target.value })} /></div>
                    <div className="form-group"><label>Mode</label><select value={newCourse.mode} onChange={(e) => setNewCourse({ ...newCourse, mode: e.target.value })}><option>Offline</option><option>Online Live</option><option>Hybrid</option></select></div>
                    <div className="form-group"><label>Status</label><select value={newCourse.status} onChange={(e) => setNewCourse({ ...newCourse, status: e.target.value })}><option>Active</option><option>Inactive</option></select></div>
                    <div className="form-group" style={{ gridColumn: "1 / -1" }}><label>Description</label><textarea rows="2" placeholder="Short course description" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} /></div>
                  </div>
                  <div className="form-buttons"><button type="button" className="cancel-btn" onClick={() => { setShowCourseForm(false); setEditingCourse(null); }}>Cancel</button><button type="submit" className="save-btn">{editingCourse ? "Update Course" : "Save Course"}</button></div>
                </form>
              </div>
            )}

            {/* Search / Filter */}
            <div className="courses-filter-card" style={{
              background: "#fff", border: "1px solid #e7e9e5", borderRadius: 12,
              padding: "10px 12px", marginBottom: 12, display: "flex", gap: 10,
              justifyContent: "space-between", alignItems: "center", flexWrap: "wrap"
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16 }}>All Courses</h3>
                <p style={{ margin: "2px 0 0", color: "#8a8f98", fontSize: 11 }}>{courses.length} program{courses.length !== 1 ? "s" : ""}</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <input
                  type="text"
                  placeholder="Search course..."
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  style={{ width: 220, height: 36, padding: "0 11px", border: "1px solid #dfe3df", borderRadius: 9, outline: "none", boxSizing: "border-box" }}
                />
                <select
                  value={courseStatusFilter}
                  onChange={(e) => setCourseStatusFilter(e.target.value)}
                  style={{ height: 36, padding: "0 10px", border: "1px solid #dfe3df", borderRadius: 9, background: "#fff", color: "#333" }}
                >
                  <option>All</option><option>Active</option><option>Inactive</option>
                </select>
              </div>
            </div>

            {/* Compact Course List */}
            {(() => {
              const filteredCourses = courses.filter((course) => {
                const q = courseSearch.trim().toLowerCase();
                const matchesSearch = !q || [course.name, course.duration, course.mode, course.status, course.description].some((v) => String(v || "").toLowerCase().includes(q));
                const matchesStatus = courseStatusFilter === "All" || course.status === courseStatusFilter;
                return matchesSearch && matchesStatus;
              });

              if (!filteredCourses.length) {
                return (
                  <div style={{ background: "#fff", border: "1px solid #e7e9e5", borderRadius: 12, padding: 36, textAlign: "center", color: "#818692" }}>
                    <h3 style={{ margin: 0, color: "#222", fontSize: 16 }}>{courses.length ? "No matching courses" : "No courses yet"}</h3>
                    <p style={{ margin: "6px 0 0", fontSize: 12 }}>{courses.length ? "Try changing your search or status filter." : "Add your first training program to get started."}</p>
                  </div>
                );
              }

              return (
                <div className="courses-list-scroll" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {filteredCourses.map((course) => {
                    const courseBatches = batches.filter((b) => b.course === course.name);
                    const courseStudents = students.filter((s) => s.course === course.name);
                    return (
                      <div key={course.id} className="course-item-card" style={{
                        background: "#fff", border: "1px solid #e4e8e3", borderRadius: 14,
                        boxShadow: "0 4px 15px rgba(20,30,20,.035)", overflow: "hidden"
                      }}>
                        <div style={{ display: "grid", gridTemplateColumns: "minmax(240px, 1.7fr) repeat(4, minmax(90px, .6fr)) auto", alignItems: "center", gap: 14, padding: "13px 15px" }}>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ fontSize: 16, fontWeight: 800, color: "#182017", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{course.name}</div>
                              <span className={course.status === "Active" ? "status active-status" : "status pending-status"} style={{ fontSize: 10, padding: "4px 7px" }}>{course.status}</span>
                            </div>
                            <div style={{ fontSize: 11, color: "#80867f", marginTop: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{course.description || "Professional training program"}</div>
                          </div>

                          <div><div style={{ color: "#92988f", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>Fee</div><div style={{ marginTop: 2, fontSize: 14, fontWeight: 800 }}>{formatMoney(course.fee)}</div></div>
                          <div><div style={{ color: "#92988f", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>Duration</div><div style={{ marginTop: 2, fontSize: 13, fontWeight: 700 }}>{course.duration || "—"}</div></div>
                          <div><div style={{ color: "#92988f", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>Batches</div><div style={{ marginTop: 2, fontSize: 15, fontWeight: 800 }}>{courseBatches.length}</div></div>
                          <div><div style={{ color: "#92988f", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>Students</div><div style={{ marginTop: 2, fontSize: 15, fontWeight: 800 }}>{courseStudents.length}</div></div>

                          <div style={{ display: "flex", gap: 5, justifyContent: "flex-end", flexWrap: "wrap" }}>
                            <button className="action-btn" style={{ padding: "7px 9px", fontSize: 12 }} onClick={() => handleEditCourse(course)}>Edit</button>
                            <button className="action-btn" style={{ padding: "7px 9px", fontSize: 12 }} onClick={() => setActiveMenu("Batches")}>Batches</button>
                            <button className="action-btn delete-btn" style={{ padding: "7px 9px", fontSize: 12 }} onClick={() => handleDeleteCourse(course)}>Delete</button>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 18, padding: "7px 15px", borderTop: "1px solid #eef1ed", background: "#fbfcfb", color: "#6f766f", fontSize: 11 }}>
                          <span><strong style={{ color: "#39413a" }}>Mode:</strong> {course.mode}</span>
                          <span><strong style={{ color: "#39413a" }}>Duration:</strong> {course.duration || "—"}</span>
                          <span><strong style={{ color: "#39413a" }}>Students:</strong> {courseStudents.length}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* ================================================= */}
        {/* ================= BATCHES ======================= */}

        {activeMenu === "Batches" && (
          <div className="students-page">
            <div className="page-actions">
              <div><h2>All Batches</h2><p>See which students are in each batch</p></div>
              <button className="add-student-btn" onClick={() => setShowBatchForm(true)}><IconPlus size={15} /> Add Batch</button>
            </div>

            {showBatchForm && (
              <div className="student-form-card">
                <div className="form-header"><h2>{editingBatch ? "Edit Batch" : "Add New Batch"}</h2><button className="close-btn" onClick={() => { setShowBatchForm(false); setEditingBatch(null); }}><IconClose size={15} /></button></div>
                <form onSubmit={handleAddBatch}>
                  <div className="form-grid">
                    <div className="form-group"><label>Batch Name *</label><input type="text" placeholder="e.g. DS-01 Morning" value={newBatch.name} onChange={(e) => setNewBatch({ ...newBatch, name: e.target.value })} /></div>
                    <div className="form-group"><label>Course *</label><select value={newBatch.course} onChange={(e) => setNewBatch({ ...newBatch, course: e.target.value })}><option value="">Select Course</option>{courses.map((course) => <option key={course.id} value={course.name}>{course.name}</option>)}</select></div>
                    <div className="form-group"><label>Trainer</label><select value={newBatch.trainer} onChange={(e) => setNewBatch({ ...newBatch, trainer: e.target.value })}><option value="">Select Trainer</option>{staff.filter((member) => member.status === "Active" && (member.role === "Trainer" || member.role === "Instructor")).map((member) => <option key={member.id} value={member.name}>{member.name} — {member.role}</option>)}{newBatch.trainer && !staff.some((member) => member.name === newBatch.trainer) && <option value={newBatch.trainer}>{newBatch.trainer} (Current)</option>}</select>{staff.filter((member) => member.status === "Active" && (member.role === "Trainer" || member.role === "Instructor")).length === 0 && <small style={{ color: "#7a808a" }}>Add an active Trainer/Instructor in Staff first.</small>}</div>
                    <div className="form-group"><label>Class Timing</label><input type="text" placeholder="e.g. 10:00 AM - 12:00 PM" value={newBatch.timing} onChange={(e) => setNewBatch({ ...newBatch, timing: e.target.value })} /></div>
                    <div className="form-group"><label>Start Date *</label><input type="date" value={newBatch.startDate} onChange={(e) => setNewBatch({ ...newBatch, startDate: e.target.value })} /></div>
                    <div className="form-group"><label>End Date</label><input type="date" value={newBatch.endDate} onChange={(e) => setNewBatch({ ...newBatch, endDate: e.target.value })} /></div>
                    <div className="form-group"><label>Mode</label><select value={newBatch.mode} onChange={(e) => setNewBatch({ ...newBatch, mode: e.target.value })}><option>Offline</option><option>Online Live</option><option>Hybrid</option></select></div>
                    <div className="form-group"><label>Status</label><select value={newBatch.status} onChange={(e) => setNewBatch({ ...newBatch, status: e.target.value })}><option>Active</option><option>Completed</option><option>Upcoming</option></select></div>
                    <div className="form-group" style={{gridColumn:"1 / -1"}}><label>WhatsApp Group Link</label><input type="url" placeholder="https://chat.whatsapp.com/..." value={newBatch.whatsappGroupLink} onChange={(e) => setNewBatch({ ...newBatch, whatsappGroupLink: e.target.value })} /><small style={{display:"block",marginTop:6,color:"#7b8591"}}>CAX-002 jaise batch ke WhatsApp group ka invite link yahan paste karo.</small></div>
                  </div>
                  <div className="form-buttons"><button type="button" className="cancel-btn" onClick={() => { setShowBatchForm(false); setEditingBatch(null); }}>Cancel</button><button type="submit" className="save-btn">{editingBatch ? "Update Batch" : "Save Batch"}</button></div>
                </form>
              </div>
            )}

            <div className="students-table-card"><div className="card-header"><div><h2>Batch List</h2><p>{batches.length} batch{batches.length !== 1 ? "es" : ""} created</p></div></div>
              <div style={{ overflowX: "auto" }}><table><thead><tr><th>Batch</th><th>Course</th><th>Trainer</th><th>Timing</th><th>Start Date</th><th>Students</th><th>WhatsApp</th><th>Status</th><th>Actions</th></tr></thead><tbody>
                {batches.length === 0 ? <tr><td colSpan="9" style={{ textAlign: "center", padding: 40, color: "#777" }}>No batches added yet.</td></tr> : batches.map((batch) => <tr key={batch.id}><td><strong>{batch.name}</strong></td><td>{batch.course}</td><td>{batch.trainer || "—"}</td><td>{batch.timing || "—"}</td><td>{batch.startDate || "—"}</td><td><strong>{getBatchStudents(batch.name).length}</strong></td><td>{batch.whatsappGroupLink ? <span className="status active-status">Linked</span> : <span className="status pending-status">Not Added</span>}</td><td><span className={batch.status === "Active" ? "status active-status" : "status pending-status"}>{batch.status}</span></td><td><button className="action-btn" onClick={() => handleEditBatch(batch)}>Edit</button><button className="action-btn delete-btn" onClick={() => handleDeleteBatch(batch)}>Delete</button></td></tr>)}
              </tbody></table></div>
            </div>

            {batches.length > 0 && <div className="students-table-card" style={{ marginTop: 20 }}><div className="card-header"><div><h2>Batch-wise Students</h2><p>Click through the list to see exactly who belongs to each batch</p></div></div><div style={{ overflowX: "auto" }}><table><thead><tr><th>Batch</th><th>Course</th><th>Students</th><th>Student Names</th></tr></thead><tbody>{batches.map((batch) => { const batchStudents = getBatchStudents(batch.name); return <tr key={`students-${batch.id}`}><td><strong>{batch.name}</strong></td><td>{batch.course}</td><td>{batchStudents.length}</td><td>{batchStudents.length ? batchStudents.map((s) => s.name).join(", ") : "No students assigned"}</td></tr>; })}</tbody></table></div></div>}
          </div>
        )}

        {/* ================================================= */}
        {/* ================= ADMISSIONS ==================== */}
        {/* ================================================= */}

        {activeMenu === "Admissions" && (

          <div className="students-page">


            {/* ADMISSIONS TOP */}

            <div className="page-actions">

              <div>

                <h2>
                  All Admissions
                </h2>

                <p>
                  Total {admissions.length} admissions
                </p>

              </div>


              <button

                className="add-student-btn"

                onClick={() =>
                  setShowAdmissionForm(true)
                }

              >

                <IconPlus size={15} />

                New Admission

              </button>


            </div>


            {/* ADMISSION FORM */}

            {showAdmissionForm && (

              <div className="student-form-card">


                <div className="form-header">

                  <h2>
                    New Admission
                  </h2>


                  <button

                    className="close-btn"

                    onClick={() =>
                      setShowAdmissionForm(false)
                    }

                  >

                    <IconClose size={15} />

                  </button>

                </div>


                <form onSubmit={handleAddAdmission}>


                  <div className="form-grid">


                    <div className="form-group">

                      <label>
                        Student Name *
                      </label>

                      <input

                        type="text"

                        placeholder="Enter student name"

                        value={newAdmission.student}

                        onChange={(e) =>
                          setNewAdmission({
                            ...newAdmission,
                            student: e.target.value,
                          })
                        }

                      />

                    </div>


                    <div className="form-group">

                      <label>
                        Course *
                      </label>

                      <select
                        value={newAdmission.course}
                        onChange={(e) =>
                          setNewAdmission({
                            ...newAdmission,
                            course: e.target.value,
                            batch: "",
                          })
                        }
                      >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                          <option key={course.id} value={course.name}>
                            {course.name}
                          </option>
                        ))}
                      </select>

                    </div>


                    <div className="form-group">

                      <label>
                        Batch *
                      </label>

                      <select
                        value={newAdmission.batch}
                        onChange={(e) =>
                          setNewAdmission({
                            ...newAdmission,
                            batch: e.target.value,
                          })
                        }
                        disabled={!newAdmission.course}
                      >
                        <option value="">
                          {newAdmission.course ? "Select Batch" : "Select Course First"}
                        </option>
                        {getCourseBatches(newAdmission.course).map((batch) => (
                          <option key={batch.id} value={batch.name}>
                            {batch.name} — {batch.timing || "Timing not set"}
                          </option>
                        ))}
                      </select>
                      {newAdmission.course && getCourseBatches(newAdmission.course).length === 0 && (
                        <small style={{ color: "#b45309", display: "block", marginTop: 6 }}>
                          No batch created for this course yet. Create a batch first.
                        </small>
                      )}

                    </div>


                    <div className="form-group">

                      <label>
                        Status
                      </label>

                      <select

                        value={newAdmission.status}

                        onChange={(e) =>
                          setNewAdmission({
                            ...newAdmission,
                            status: e.target.value,
                          })
                        }

                      >

                        <option>
                          Confirmed
                        </option>

                        <option>
                          Pending
                        </option>

                      </select>

                    </div>


                  </div>


                  <div className="form-buttons">


                    <button

                      type="button"

                      className="cancel-btn"

                      onClick={() =>
                        setShowAdmissionForm(false)
                      }

                    >

                      Cancel

                    </button>


                    <button

                      type="submit"

                      className="save-btn"

                    >

                      Save Admission

                    </button>


                  </div>


                </form>


              </div>

            )}


            {/* ADMISSIONS TABLE */}

            <div className="students-table-card admissions-table-card">


              <div className="admissions-data-scroll">


                <table>


                <thead>

                  <tr>

                    <th>
                      Student
                    </th>

                    <th>
                      Course
                    </th>

                    <th>
                      Batch
                    </th>

                    <th>
                      Date
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {admissions.map((admission) => (

                    <tr key={admission.id}>


                      <td>

                        <div className="student-name">

                          <div className="student-avatar">

                            {admission.student.charAt(0)}

                          </div>

                          {admission.student}

                        </div>

                      </td>


                      <td>
                        {admission.course}
                      </td>


                      <td>
                        {admission.batch}
                      </td>


                      <td>
                        {admission.date}
                      </td>


                      <td>

                        <span

                          className={
                            admission.status === "Confirmed"
                              ? "status active-status"
                              : "status pending-status"
                          }

                        >

                          {admission.status}

                        </span>

                      </td>


                      <td>


                       <button
  className="action-btn"
  onClick={() => {
    setNewAdmission({
      student: admission.student,
      course: admission.course,
      batch: admission.batch,
      status: admission.status,
    });

    setEditingAdmission(admission);
    setShowAdmissionForm(true);
  }}
>
  Edit
</button>

                        <button

                          className="action-btn delete-btn"

                          onClick={async () => {

                            const confirmDelete =
                              window.confirm(
                                `Delete ${admission.student}?`
                              );

                            if (confirmDelete) {

                              const { error } = await supabase
                                .from("admissions")
                                .delete()
                                .eq("id", admission.id);

                              if (error) {
                                console.error("Admission delete error:", error);
                                alert(`Could not delete admission: ${error.message}`);
                                return;
                              }

                              setAdmissions((items) =>
                                items.filter((item) => item.id !== admission.id)
                              );

                            }

                          }}

                        >

                          Delete

                        </button>


                      </td>


                    </tr>

                  ))}

                </tbody>


              </table>


              </div>


            </div>


          </div>

        )}


        {/* ================================================= */}
        {/* ================= FEES ================= */}

        {activeMenu === "Fees" && (
          <div className="students-page">
            <section className="stats-grid fees-stats-grid" style={{ marginBottom: 20 }}>
              <div className="stat-card"><div className="stat-icon blue">₹</div><div><p>Total Fees</p><h2>{formatMoney(getTotalFees())}</h2></div></div>
              <div className="stat-card"><div className="stat-icon purple">₹</div><div><p>Total Paid</p><h2>{formatMoney(getPaidFees())}</h2></div></div>
              <div className="stat-card"><div className="stat-icon red">₹</div><div><p>Total Pending</p><h2>{formatMoney(getPendingFees())}</h2></div></div>
            </section>

            <div className="students-table-card">
              <div className="card-header"><div><h2>Student Fee Status</h2><p>Track total, paid and pending fees</p></div></div>
              <div style={{ overflowX: "auto" }}>
                <table><thead><tr>
                  <th>Student</th><th>Course</th><th>Batch</th><th>Total Fees</th><th>Paid Fees</th><th>Pending Fees</th><th>Action</th>
                </tr></thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td><div className="student-name"><div className="student-avatar">{student.name.charAt(0)}</div>{student.name}</div></td>
                      <td>{student.course}</td><td>{student.batch}</td>
                      <td>{formatMoney(parseMoney(student.fee))}</td>
                      <td>{formatMoney(parseMoney(student.paidFee))}</td>
                      <td>{formatMoney(getStudentPending(student))}</td>
                      <td><button className="action-btn" onClick={() => { setActiveMenu("Payments"); openPaymentForm(student); }}>Add Payment</button></td>
                    </tr>
                  ))}
                </tbody></table>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAYMENTS ================= */}

        {activeMenu === "Payments" && (
          <div className="students-page">
            <div className="page-actions">
              <div><h2>Payment History</h2><p>{payments.length} payment{payments.length !== 1 ? "s" : ""} recorded</p></div>
              <button className="add-student-btn" onClick={() => openPaymentForm()}><IconPlus size={15} /> Add Payment</button>
            </div>

            {showPaymentForm && (
              <div className="student-form-card">
                <div className="form-header">
                  <h2>{editingPayment ? "Edit Payment" : "Add New Payment"}</h2>
                  <button className="close-btn" onClick={() => { setShowPaymentForm(false); setEditingPayment(null); }}><IconClose size={15} /></button>
                </div>

                <form onSubmit={handleAddPayment}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Student *</label>
                      <select value={newPayment.studentId} onChange={(e) => setNewPayment({ ...newPayment, studentId: e.target.value })}>
                        <option value="">Select Student</option>
                        {students.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.name}
                          </option>
                        ))}
                      </select>
                      {selectedPaymentStudent && (
                        <div className="payment-student-info">
                          <span><strong>Course:</strong> {selectedPaymentStudent.course || "—"}</span>
                          <span><strong>Batch:</strong> {selectedPaymentStudent.batch || "—"}</span>
                          <span><strong>Pending:</strong> {formatMoney(getStudentPending(selectedPaymentStudent))}</span>
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Payment Amount *</label>
                      <input type="number" min="1" placeholder="Enter amount" value={newPayment.amount} onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Payment Date *</label>
                      <input type="date" value={newPayment.date} onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value, nextInstallmentDate: newPayment.nextInstallmentDate || addOneMonth(e.target.value) })} />
                    </div>
                    <div className="form-group">
                      <label>Paid For Month *</label>
                      <input type="month" value={newPayment.paidForMonth} onChange={(e) => setNewPayment({ ...newPayment, paidForMonth: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Next Installment Date *</label>
                      <input type="date" value={newPayment.nextInstallmentDate} onChange={(e) => setNewPayment({ ...newPayment, nextInstallmentDate: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Payment Mode *</label>
                      <select value={newPayment.mode} onChange={(e) => setNewPayment({ ...newPayment, mode: e.target.value })}>
                        <option>UPI</option><option>Cash</option><option>Bank Transfer</option><option>Card</option><option>Cheque</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Transaction / Reference No.</label>
                      <input type="text" placeholder="Optional" value={newPayment.reference} onChange={(e) => setNewPayment({ ...newPayment, reference: e.target.value })} />
                    </div>
                  </div>

                  <div className="form-buttons">
                    <button type="button" className="cancel-btn" onClick={() => { setShowPaymentForm(false); setEditingPayment(null); }}>Cancel</button>
                    <button type="submit" className="save-btn">{editingPayment ? "Update Payment" : "Save Payment"}</button>
                  </div>
                </form>
              </div>
            )}

            <div className="students-table-card">
              <div className="card-header"><div><h2>All Payments</h2><p>Complete payment transaction history</p></div></div>
              <div style={{ overflowX: "auto" }}>
                <table><thead><tr>
                  <th>Student</th><th>Course</th><th>Batch</th><th>Amount</th><th>Date</th><th>Mode</th><th>Reference</th><th>Actions</th>
                </tr></thead>
                <tbody>
                  {payments.length === 0 ? (
                    <tr><td colSpan="8" style={{ textAlign: "center", padding: 40, color: "#777" }}>No payments recorded yet.</td></tr>
                  ) : payments.map((payment) => {
                    const paymentStudent = students.find((student) => String(student.id) === String(payment.studentId));
                    const paymentCourse = payment.course || paymentStudent?.course || "—";
                    const paymentBatch = payment.batch || paymentStudent?.batch || "—";
                    return (
                      <tr key={payment.id}>
                        <td><div className="student-name"><div className="student-avatar">{payment.student?.charAt(0)?.toUpperCase() || "P"}</div><strong>{payment.student}</strong></div></td>
                        <td>{paymentCourse}</td>
                        <td><span style={{ fontWeight: 700, color: "#006100" }}>{paymentBatch}</span></td>
                        <td><strong>{formatMoney(payment.amount)}</strong></td>
                        <td>{payment.date}</td>
                        <td>{payment.mode}</td>
                        <td>{payment.reference || "—"}</td>
                        <td>
                          <div style={{ display: "flex", gap: 6, alignItems: "center", whiteSpace: "nowrap" }}>
                            <button className="action-btn" onClick={() => handleEditPayment(payment)}>Edit</button>
                            <button className="action-btn delete-btn" onClick={() => handleDeletePayment(payment)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody></table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* ================= STAFF ========================= */}
        {/* ================================================= */}

        {activeMenu === "Staff" && (
          <div className="students-page">
            <div className="page-actions">
              <div>
                <h2>Staff & Trainers</h2>
                <p>Manage your team and assign trainers to batches.</p>
              </div>
              <button className="add-student-btn" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 16px",borderRadius:13,boxShadow:"0 8px 18px rgba(0,97,0,.16)"}} onClick={() => {
                setEditingStaff(null);
                setNewStaff({ name: "", phone: "", email: "", role: "Trainer", joinDate: "", status: "Active" });
                setShowStaffForm(true);
              }}>
                <span style={{width:24,height:24,borderRadius:8,display:"grid",placeItems:"center",background:"rgba(255,255,255,.14)"}}><IconPlus size={15}/></span> Add Staff
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 14, marginBottom: 20 }}>
              {[
                ["Total Staff", staff.length, "All team members"],
                ["Active Staff", staff.filter((m) => m.status === "Active").length, "Currently active"],
                ["Trainers", staff.filter((m) => m.role === "Trainer" || m.role === "Instructor").length, "Teaching team"],
                ["Assigned Batches", staff.reduce((sum, m) => sum + getStaffBatches(m).length, 0), "Trainer assignments"],
              ].map(([label, value, sub], index) => (
                <div key={label} className="stat-card" style={{ padding: 18 }}>
                  <div className="stat-card-label" style={{ fontSize: 12 }}>{label}</div>
                  <div className="stat-card-value" style={{ marginTop: 6, fontSize: 26 }}>{value}</div>
                  <div style={{ marginTop: 5, color: "#9298a4", fontSize: 12 }}>{sub}</div>
                </div>
              ))}
            </div>

            {showStaffForm && (
              <div className="student-form-card">
                <div className="form-header">
                  <h2>{editingStaff ? "Edit Staff Member" : "Add Staff Member"}</h2>
                  <button className="close-btn" onClick={() => { setShowStaffForm(false); setEditingStaff(null); }}><IconClose size={15} /></button>
                </div>
                <form onSubmit={handleAddStaff}>
                  <div className="form-grid">
                    <div className="form-group"><label>Name *</label><input type="text" placeholder="Full name" value={newStaff.name} onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })} /></div>
                    <div className="form-group"><label>Phone *</label><input type="tel" placeholder="Phone number" value={newStaff.phone} onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })} /></div>
                    <div className="form-group"><label>Email</label><input type="email" placeholder="Email address" value={newStaff.email} onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })} /></div>
                    <div className="form-group"><label>Role *</label><select value={newStaff.role} onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}><option>Trainer</option><option>Instructor</option><option>Manager</option><option>Admission Counsellor</option><option>Social Media Manager</option><option>Accountant</option><option>Admin</option><option>Other</option></select></div>
                    <div className="form-group"><label>Joining Date</label><input type="date" value={newStaff.joinDate} onChange={(e) => setNewStaff({ ...newStaff, joinDate: e.target.value })} /></div>
                    <div className="form-group"><label>Status</label><select value={newStaff.status} onChange={(e) => setNewStaff({ ...newStaff, status: e.target.value })}><option>Active</option><option>Inactive</option></select></div>
                  </div>
                  <div className="form-buttons">
                    <button type="button" className="cancel-btn" onClick={() => { setShowStaffForm(false); setEditingStaff(null); }}>Cancel</button>
                    <button type="submit" className="save-btn">{editingStaff ? "Update Staff" : "Save Staff"}</button>
                  </div>
                </form>
              </div>
            )}

            <div className="students-table-card">
              <div className="card-header" style={{ alignItems: "center" }}>
                <div><h2>Team Directory</h2><p>{staff.length} staff member{staff.length !== 1 ? "s" : ""}</p></div>
                <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"}}>
                  <div style={{position:"relative",minWidth:230}}>
                    <IconSearch size={16} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#8d95a3",pointerEvents:"none"}} />
                    <input className="search-input" aria-label="Find staff" placeholder="Search name or phone" value={staffSearch} onChange={(e) => setStaffSearch(e.target.value)} style={{width:"100%",minWidth:0,paddingLeft:36,borderRadius:12,height:42,boxSizing:"border-box"}} />
                  </div>
                  <div style={{position:"relative"}}>
                    <IconFilter size={15} style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:"#78818f",pointerEvents:"none",zIndex:1}} />
                    <select aria-label="Filter by role" value={staffRoleFilter} onChange={(e) => setStaffRoleFilter(e.target.value)} style={{minWidth:145,height:42,paddingLeft:34,paddingRight:30,borderRadius:12}}>
                      <option value="All">All Roles</option>
                      <option value="Trainer">Trainer</option>
                      <option value="Instructor">Instructor</option>
                      <option value="Manager">Manager</option>
                      <option value="Admission Counsellor">Counsellor</option>
                      <option value="Social Media Manager">Social Media</option>
                      <option value="Accountant">Accountant</option>
                      <option value="Admin">Admin</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div style={{position:"relative"}}>
                    <IconFilter size={15} style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:"#78818f",pointerEvents:"none",zIndex:1}} />
                    <select aria-label="Filter by status" value={staffStatusFilter} onChange={(e) => setStaffStatusFilter(e.target.value)} style={{minWidth:125,height:42,paddingLeft:34,paddingRight:30,borderRadius:12}}>
                      <option value="All">All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table>
                  <thead><tr><th>Staff</th><th>Role</th><th>Phone</th><th>Email</th><th>Joining Date</th><th>Batches</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {filteredStaff.length === 0 ? (
                      <tr><td colSpan="8" style={{ textAlign: "center", padding: 48, color: "#777" }}>{staff.length ? "No staff matches your search." : "No staff added yet."}</td></tr>
                    ) : filteredStaff.map((member) => {
                      const assigned = getStaffBatches(member);
                      return (
                        <tr key={member.id}>
                          <td><div className="student-name"><div className="student-avatar">{member.name?.charAt(0)?.toUpperCase() || "S"}</div><div><strong>{member.name}</strong><div style={{ color: "#9298a4", fontSize: 12, marginTop: 2 }}>{member.status === "Active" ? "Available" : "Not active"}</div></div></div></td>
                          <td>{member.role}</td>
                          <td>{member.phone || "—"}</td>
                          <td>{member.email || "—"}</td>
                          <td>{member.joinDate || "—"}</td>
                          <td><strong>{assigned.length}</strong></td>
                          <td><span className={member.status === "Active" ? "status active-status" : "status pending-status"}>{member.status}</span></td>
                          <td><button className="action-btn" onClick={() => handleEditStaff(member)}>Edit</button><button className="action-btn delete-btn" onClick={() => handleDeleteStaff(member)}>Delete</button></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {staff.some((member) => getStaffBatches(member).length > 0) && (
              <div className="students-table-card" style={{ marginTop: 20 }}>
                <div className="card-header"><div><h2>Trainer Assignments</h2><p>See which batches are assigned to each trainer.</p></div></div>
                <div style={{ overflowX: "auto" }}>
                  <table><thead><tr><th>Trainer</th><th>Role</th><th>Assigned Batches</th><th>Students</th></tr></thead>
                    <tbody>{staff.filter((member) => getStaffBatches(member).length > 0).map((member) => {
                      const assigned = getStaffBatches(member);
                      const studentCount = assigned.reduce((sum, batch) => sum + getBatchStudents(batch.name).length, 0);
                      return <tr key={`assign-${member.id}`}><td><strong>{member.name}</strong></td><td>{member.role}</td><td>{assigned.map((batch) => batch.name).join(", ")}</td><td><strong>{studentCount}</strong></td></tr>;
                    })}</tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= STAFF ATTENDANCE ================= */}
        {activeMenu === "Attendance" && (
          <div className="students-page" style={{maxWidth: 1180, margin: "0 auto"}}>
            <div className="page-actions" style={{marginBottom: 22}}>
              <div>
                <h2 style={{fontSize: 30, marginBottom: 6}}>Staff Attendance</h2>
                <p>Track daily attendance, leave, WFH and working hours in one place.</p>
              </div>
              <button className="add-student-btn" disabled={!staff.length} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 16px",borderRadius:13,boxShadow:"0 8px 18px rgba(0,97,0,.16)",...(!staff.length ? { opacity: .5, cursor: "not-allowed" } : {})}} onClick={() => {
                setEditingAttendance(null);
                setNewAttendance({ staffId: staff[0] ? String(staff[0].id) : "", date: new Date().toISOString().split("T")[0], checkIn: "", checkOut: "", status: "Present", note: "" });
                setShowAttendanceForm(true);
              }}><span style={{width:24,height:24,borderRadius:8,display:"grid",placeItems:"center",background:"rgba(255,255,255,.14)"}}><IconPlus size={15}/></span> Add Attendance</button>
            </div>

            {!staff.length && <div className="students-table-card" style={{marginBottom: 20}}><div style={{padding: 32, textAlign: "center"}}><h3 style={{marginBottom: 8}}>Add staff first</h3><p style={{color: "#777", marginBottom: 16}}>Add your employees/trainers in Staff before recording attendance.</p><button className="action-btn" onClick={() => setActiveMenu("Staff")}>Go to Staff</button></div></div>}

            {staff.length > 0 && (
              <>
                <div className="students-table-card" style={{marginBottom:18,padding:"14px 16px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:14,flexWrap:"wrap"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <button onClick={() => changeAttendanceMonth(-1)} aria-label="Previous month" title="Previous month" style={{width:40,height:40,borderRadius:12,border:"1px solid #e6e9ee",background:"#fff",display:"grid",placeItems:"center",color:"#1e293b",cursor:"pointer",boxShadow:"0 2px 6px rgba(17,24,39,.05)"}}><IconChevronLeft size={17}/></button>
                      <div style={{minWidth:180,textAlign:"center"}}>
                        <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"7px 13px",borderRadius:12,background:"#f5faf6",border:"1px solid #e2eee5"}}>
                          <IconCalendar size={15} style={{color:"#006100"}}/>
                          <div>
                            <div style={{fontSize:10,fontWeight:800,color:"#7b8490",textTransform:"uppercase",letterSpacing:".07em"}}>Reporting Month</div>
                            <div style={{fontSize:15,fontWeight:800,color:"#16202c",marginTop:1}}>{formatAttendanceMonth(attendanceMonth)}</div>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => changeAttendanceMonth(1)} aria-label="Next month" title="Next month" style={{width:40,height:40,borderRadius:12,border:"1px solid #e6e9ee",background:"#fff",display:"grid",placeItems:"center",color:"#1e293b",cursor:"pointer",boxShadow:"0 2px 6px rgba(17,24,39,.05)"}}><IconChevronRight size={17}/></button>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                      <div style={{position:"relative"}}>
                        <IconSearch size={15} style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:"#8d95a3",pointerEvents:"none",zIndex:1}}/>
                        <select aria-label="Filter attendance by staff" value={attendanceStaffFilter} onChange={e => setAttendanceStaffFilter(e.target.value)} style={{minWidth:180,height:42,paddingLeft:33,paddingRight:30,borderRadius:12}}>
                          <option value="All">All Staff</option>
                          {staff.map(member => <option key={member.id} value={String(member.id)}>{member.name}</option>)}
                        </select>
                      </div>
                      <div style={{position:"relative"}}>
                        <IconFilter size={15} style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:"#78818f",pointerEvents:"none",zIndex:1}}/>
                        <select aria-label="Filter attendance by status" value={attendanceStatusFilter} onChange={e => setAttendanceStatusFilter(e.target.value)} style={{minWidth:145,height:42,paddingLeft:33,paddingRight:30,borderRadius:12}}>
                          <option value="All">All Status</option>
                          <option value="Present">Present</option>
                          <option value="Half Day">Half Day</option>
                          <option value="Leave">Leave</option>
                          <option value="WFH">WFH</option>
                          <option value="Absent">Absent</option>
                          <option value="Off">Off</option>
                        </select>
                      </div>
                      <button onClick={() => setAttendanceMonth(new Date().toISOString().slice(0,7))} style={{height:42,padding:"0 14px",borderRadius:12,border:"1px solid #cfe0d3",background:"#f5faf6",color:"#006100",fontWeight:800,cursor:"pointer"}}>This Month</button>
                    </div>
                  </div>
                </div>

                {(() => {
                  const monthRecords = attendanceRecords.filter(r => r.date?.startsWith(attendanceMonth));
                  const visibleRecords = monthRecords.filter(r =>
                    (attendanceStaffFilter === "All" || String(r.staffId) === String(attendanceStaffFilter)) &&
                    (attendanceStatusFilter === "All" || r.status === attendanceStatusFilter)
                  );
                  const countStatus = (status) => monthRecords.filter(r => r.status === status).length;
                  const countCheckout = (label) => monthRecords.filter(r => (r.checkoutStatus || getCheckoutLabel(r.checkOut)) === label).length;
                  const activeStaff = staff.filter(m => m.status === "Active");
                  const staffSummary = activeStaff.map(member => {
                    const records = monthRecords.filter(r => String(r.staffId) === String(member.id));
                    const present = records.filter(r => r.status === "Present").length;
                    const half = records.filter(r => r.status === "Half Day").length;
                    const leave = records.filter(r => r.status === "Leave").length;
                    const wfh = records.filter(r => r.status === "WFH").length;
                    const absent = records.filter(r => r.status === "Absent").length;
                    const counted = present + half + leave + wfh + absent;
                    const percentage = counted ? Math.round(((present + half * 0.5 + wfh) / counted) * 100) : 0;
                    return {member, present, half, leave, wfh, absent, percentage};
                  }).filter(item => attendanceStaffFilter === "All" || String(item.member.id) === String(attendanceStaffFilter));

                  return <>
                    <div className="stats-grid" style={{marginBottom:18}}>
                      {[
                        ["Present", countStatus("Present"), "#0b6b3a"],
                        ["Half Day", countStatus("Half Day"), "#a16b00"],
                        ["Leave", countStatus("Leave"), "#8a5b00"],
                        ["WFH", countStatus("WFH"), "#315c9e"],
                        ["Absent", countStatus("Absent"), "#a33232"],
                        ["Early Checkout", countCheckout("Early Checkout"), "#6a4ca3"],
                      ].map(([label, value, accent]) => (
                        <div className="stat-card" key={label} style={{borderTop:`3px solid ${accent}`, minHeight:92}}>
                          <div className="stat-card-label">{label}</div>
                          <div className="stat-card-value" style={{marginTop:4}}>{value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="students-table-card" style={{marginBottom:18}}>
                      <div className="card-header" style={{alignItems:"center"}}>
                        <div><h2>Monthly Summary</h2><p>See who is present, on leave, WFH or absent at a glance.</p></div>
                      </div>
                      <div style={{overflowX:"auto"}}>
                        <table>
                          <thead><tr><th>Staff</th><th>Present</th><th>Half Day</th><th>Leave</th><th>WFH</th><th>Absent</th><th>Attendance %</th></tr></thead>
                          <tbody>
                            {staffSummary.map(item => <tr key={item.member.id}>
                              <td><div className="student-name"><div className="student-avatar">{item.member.name?.charAt(0)?.toUpperCase() || "S"}</div><div><strong>{item.member.name}</strong><div style={{fontSize:12,color:"#8b93a0",marginTop:2}}>{item.member.role}</div></div></div></td>
                              <td><span style={{fontWeight:700,color:"#0b6b3a"}}>{item.present}</span></td>
                              <td><span style={{fontWeight:700,color:"#a16b00"}}>{item.half}</span></td>
                              <td><span style={{fontWeight:700,color:"#8a5b00"}}>{item.leave}</span></td>
                              <td><span style={{fontWeight:700,color:"#315c9e"}}>{item.wfh}</span></td>
                              <td><span style={{fontWeight:700,color:"#a33232"}}>{item.absent}</span></td>
                              <td><div style={{display:"flex",alignItems:"center",gap:8,minWidth:120}}><div style={{flex:1,height:7,background:"#eef1f4",borderRadius:99,overflow:"hidden"}}><div style={{width:`${item.percentage}%`,height:"100%",background:"#006100",borderRadius:99}} /></div><strong>{item.percentage}%</strong></div></td>
                            </tr>)}
                            {!staffSummary.length && <tr><td colSpan="7" style={{textAlign:"center",padding:30,color:"#777"}}>No active staff found.</td></tr>}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {showAttendanceForm && <div className="student-form-card" style={{marginBottom:18}}>
                      <div className="form-header"><h2>{editingAttendance ? "Edit Attendance" : "Add Staff Attendance"}</h2><button className="close-btn" onClick={() => {setShowAttendanceForm(false); setEditingAttendance(null);}}><IconClose size={15}/></button></div>
                      <form onSubmit={handleAddAttendance}>
                        <div className="form-grid">
                          <div className="form-group"><label>Staff Member *</label><select value={newAttendance.staffId} onChange={e => setNewAttendance({...newAttendance, staffId:e.target.value})}><option value="">Select Staff</option>{staff.filter(m => m.status === "Active").map(m => <option key={m.id} value={m.id}>{m.name} — {m.role}</option>)}</select></div>
                          <div className="form-group"><label>Date *</label><input type="date" value={newAttendance.date} onChange={e => setNewAttendance({...newAttendance, date:e.target.value})}/></div>
                          <div className="form-group"><label>Check-in</label><input type="time" value={newAttendance.checkIn} onChange={e => setNewAttendance({...newAttendance, checkIn:e.target.value, status:e.target.value && e.target.value > "10:15" ? "Half Day" : "Present"})}/></div>
                          <div className="form-group"><label>Checkout</label><input type="time" value={newAttendance.checkOut} onChange={e => setNewAttendance({...newAttendance, checkOut:e.target.value})}/></div>
                          <div className="form-group"><label>Status *</label><select value={newAttendance.status} onChange={e => setNewAttendance({...newAttendance, status:e.target.value})}><option>Present</option><option>Half Day</option><option>Absent</option><option>Leave</option><option>WFH</option><option>Off</option></select></div>
                          <div className="form-group"><label>Note</label><input type="text" placeholder="Optional" value={newAttendance.note} onChange={e => setNewAttendance({...newAttendance, note:e.target.value})}/></div>
                        </div>
                        <div style={{padding:"10px 14px", background:"#f7f9f7", borderRadius:10, marginTop:10, fontSize:13, color:"#58605b"}}><strong>Office rules:</strong> 10:00 AM start • up to 10:15 AM = Present • after 10:15 AM = Half Day • 7:00 PM or later = Normal Checkout • before 7:00 PM = Early Checkout • Sunday = Off</div>
                        <div className="form-buttons"><button type="button" className="cancel-btn" onClick={() => {setShowAttendanceForm(false); setEditingAttendance(null);}}>Cancel</button><button type="submit" className="save-btn">{editingAttendance ? "Update Attendance" : "Save Attendance"}</button></div>
                      </form>
                    </div>}

                    <div className="students-table-card">
                      <div className="card-header" style={{alignItems:"center"}}>
                        <div><h2>Daily Attendance</h2><p>{visibleRecords.length} record{visibleRecords.length === 1 ? "" : "s"} for the selected view.</p></div>
                        <div style={{fontSize:13,color:"#7b8490"}}>Use the filters above to narrow the list.</div>
                      </div>
                      <div style={{overflowX:"auto"}}>
                        <table>
                          <thead><tr><th>Date</th><th>Staff</th><th>Role</th><th>Check-in</th><th>Checkout</th><th>Checkout Status</th><th>Status</th><th>Note</th><th>Actions</th></tr></thead>
                          <tbody>
                            {visibleRecords.sort((a,b)=>`${b.date}-${b.staffName}`.localeCompare(`${a.date}-${a.staffName}`)).map(record => { const member=staff.find(m=>String(m.id)===String(record.staffId)); return <tr key={record.id}><td>{record.date}</td><td><div className="student-name"><div className="student-avatar">{record.staffName?.charAt(0)?.toUpperCase()||"S"}</div><strong>{record.staffName}</strong></div></td><td>{member?.role||"—"}</td><td>{record.checkIn||"—"}</td><td>{record.checkOut||"—"}</td><td>{record.checkoutStatus||getCheckoutLabel(record.checkOut)}</td><td><span className={record.status === "Present" || record.status === "WFH" ? "status active-status" : "status pending-status"}>{record.status}</span></td><td>{record.note||"—"}</td><td><div style={{display:"flex",gap:6,whiteSpace:"nowrap"}}><button className="action-btn" onClick={()=>handleEditAttendance(record)}>Edit</button><button className="action-btn delete-btn" onClick={()=>handleDeleteAttendance(record)}>Delete</button></div></td></tr>; })}
                            {!visibleRecords.length && <tr><td colSpan="9" style={{textAlign:"center",padding:42,color:"#777"}}>No attendance records match the selected filters.</td></tr>}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>;
                })()}
              </>
            )}
          </div>
        )}

        {/* ================= COMMUNICATION CENTER ================= */}
        {activeMenu === "Announcements" && (
          <div className="students-page">
            <div className="page-actions" style={{alignItems:"center",marginBottom:18}}>
              <div>
                <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 10px",borderRadius:999,background:"#edf8f0",color:"#006100",fontSize:12,fontWeight:800,letterSpacing:".04em",textTransform:"uppercase"}}>
                  <IconMegaphone size={14}/> Communication Center
                </div>
                <h2 style={{marginTop:10}}>Announcements & WhatsApp</h2>
                <p>Manage institute announcements, batch WhatsApp groups and structured WhatsApp messages.</p>
              </div>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"}}>
                {communicationTab === "WhatsApp" && (
                  <button
                    type="button"
                    className="add-student-btn"
                    style={{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 16px",borderRadius:13,background:"#006100"}}
                    onClick={() => openWhatsappForm()}
                  >
                    <span style={{width:24,height:24,borderRadius:8,display:"grid",placeItems:"center",background:"rgba(255,255,255,.14)"}}><IconMessage size={15}/></span>
                    Send WhatsApp
                  </button>
                )}
                <button
                  type="button"
                  className="add-student-btn"
                  style={{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 16px",borderRadius:13}}
                  onClick={() => communicationTab === "Announcements"
                    ? (setEditingAnnouncement(null), setNewAnnouncement({title:"",category:"Holiday",targetType:"All Students",targetValue:"",date:new Date().toISOString().split("T")[0],message:""}), setShowAnnouncementForm(true))
                    : openPaymentForm()}
                >
                  <span style={{width:24,height:24,borderRadius:8,display:"grid",placeItems:"center",background:"rgba(255,255,255,.14)"}}><IconPlus size={15}/></span>
                  {communicationTab === "Announcements" ? "Create Announcement" : "Add Payment"}
                </button>
              </div>
            </div>

            <div style={{display:"flex",gap:8,marginBottom:18,background:"#f4f6f8",padding:5,borderRadius:12,width:"fit-content"}}>
              {[['Announcements',IconMegaphone],['WhatsApp',IconMessage]].map(([label,Comp]) => (
                <button key={label} onClick={() => setCommunicationTab(label)} style={{display:"inline-flex",alignItems:"center",gap:8,border:0,borderRadius:9,padding:"10px 14px",fontWeight:700,cursor:"pointer",background:communicationTab===label?"#fff":"transparent",color:communicationTab===label?"#006100":"#6d7480",boxShadow:communicationTab===label?"0 2px 8px rgba(0,0,0,.06)":"none"}}><Comp size={15}/>{label}</button>
              ))}
            </div>

            {communicationTab === "Announcements" && (
              <>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:14,marginBottom:18}}>
                  {[['Published',announcements.filter(a=>a.status==='Published').length,'Live announcements'],['Holiday',announcements.filter(a=>a.category==='Holiday').length,'Holiday notices'],['Recipients',announcements.reduce((sum,a)=>sum+getAnnouncementRecipients(a).length,0),'Total addressed']].map(([label,value,sub]) => <div key={label} className="stat-card" style={{padding:18}}><div className="stat-card-label">{label}</div><div className="stat-card-value" style={{marginTop:5,fontSize:26}}>{value}</div><div style={{marginTop:4,color:'#9298a4',fontSize:12}}>{sub}</div></div>)}
                </div>

                {showAnnouncementForm && <div className="student-form-card" style={{marginBottom:18}}>
                  <div className="form-header"><h2>{editingAnnouncement ? "Edit Announcement" : "Create Announcement"}</h2><button className="close-btn" onClick={() => {setShowAnnouncementForm(false);setEditingAnnouncement(null);}}><IconClose size={15}/></button></div>
                  <form onSubmit={handleSaveAnnouncement}>
                    <div className="form-grid">
                      <div className="form-group"><label>Title *</label><input value={newAnnouncement.title} onChange={e=>setNewAnnouncement({...newAnnouncement,title:e.target.value})} placeholder="e.g. Diwali Holiday Notice" /></div>
                      <div className="form-group"><label>Category</label><select value={newAnnouncement.category} onChange={e=>setNewAnnouncement({...newAnnouncement,category:e.target.value})}><option>Holiday</option><option>Class Update</option><option>Exam / Assessment</option><option>General Notice</option><option>Placement</option></select></div>
                      <div className="form-group"><label>Audience</label><select value={newAnnouncement.targetType} onChange={e=>setNewAnnouncement({...newAnnouncement,targetType:e.target.value,targetValue:""})}><option>All Students</option><option>Course</option><option>Batch</option><option>Staff</option></select></div>
                      {newAnnouncement.targetType === "Course" && <div className="form-group"><label>Course</label><select value={newAnnouncement.targetValue} onChange={e=>setNewAnnouncement({...newAnnouncement,targetValue:e.target.value})}><option value="">Select course</option>{courses.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}</select></div>}
                      {newAnnouncement.targetType === "Batch" && <div className="form-group"><label>Batch</label><select value={newAnnouncement.targetValue} onChange={e=>setNewAnnouncement({...newAnnouncement,targetValue:e.target.value})}><option value="">Select batch</option>{batches.map(b=><option key={b.id} value={b.name}>{b.name}</option>)}</select></div>}
                      <div className="form-group"><label>Date</label><input type="date" value={newAnnouncement.date} onChange={e=>setNewAnnouncement({...newAnnouncement,date:e.target.value})}/></div>
                      <div className="form-group" style={{gridColumn:"1 / -1"}}><label>Message *</label><textarea rows="5" value={newAnnouncement.message} onChange={e=>setNewAnnouncement({...newAnnouncement,message:e.target.value})} placeholder="Write the announcement here..."></textarea></div>
                    </div>
                    <div className="form-buttons"><button type="button" className="cancel-btn" onClick={()=>{setShowAnnouncementForm(false);setEditingAnnouncement(null)}}>Cancel</button><button type="submit" className="save-btn">{editingAnnouncement?"Update Announcement":"Publish Announcement"}</button></div>
                  </form>
                </div>}

                <div className="students-table-card">
                  <div className="card-header" style={{alignItems:"center"}}><div><h2>Announcement History</h2><p>{announcements.length} announcement{announcements.length===1?"":"s"}</p></div><div style={{display:"flex",gap:8,alignItems:"center"}}><div style={{position:"relative"}}><IconSearch size={15} style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:"#8d95a3"}}/><input className="search-input" placeholder="Search announcements" value={announcementSearch} onChange={e=>setAnnouncementSearch(e.target.value)} style={{paddingLeft:34,height:40,borderRadius:11}}/></div><select value={announcementFilter} onChange={e=>setAnnouncementFilter(e.target.value)} style={{height:40,borderRadius:11,padding:"0 12px"}}><option>All</option><option>Holiday</option><option>Class Update</option><option>General Notice</option></select></div></div>
                  <div style={{overflowX:"auto"}}><table><thead><tr><th>Announcement</th><th>Category</th><th>Audience</th><th>Date</th><th>Recipients</th><th>Status</th><th>Actions</th></tr></thead><tbody>
                    {announcements.filter(a=>(announcementFilter==='All'||a.category===announcementFilter)&&(`${a.title} ${a.message}`.toLowerCase().includes(announcementSearch.toLowerCase()))).map(item=><tr key={item.id}><td><strong>{item.title}</strong><div style={{fontSize:12,color:'#8d95a3',marginTop:3,maxWidth:360,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{item.message}</div></td><td>{item.category}</td><td>{item.targetType}{item.targetValue?` · ${item.targetValue}`:""}</td><td>{item.date||"—"}</td><td><strong>{getAnnouncementRecipients(item).length}</strong></td><td><span className="status active-status">Published</span></td><td><button className="action-btn" onClick={()=>handleEditAnnouncement(item)}>Edit</button><button className="action-btn delete-btn" onClick={()=>handleDeleteAnnouncement(item)}>Delete</button></td></tr>)}
                    {!announcements.length && <tr><td colSpan="7" style={{textAlign:'center',padding:42,color:'#777'}}>No announcements yet. Create your first notice.</td></tr>}
                  </tbody></table></div>
                </div>
              </>
            )}

            {communicationTab === "WhatsApp" && (
              <>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:14,marginBottom:18}}>
                  {[['Payment Records',payments.length,'Stored in CRM'],['Pending Students',pendingStudentsCount,'Students with outstanding fees'],['Total Pending',formatMoney(getPendingFees()),'Outstanding fee balance']].map(([label,value,sub]) => <div key={label} className="stat-card" style={{padding:18}}><div className="stat-card-label">{label}</div><div className="stat-card-value" style={{marginTop:5,fontSize:22}}>{value}</div><div style={{marginTop:4,color:'#9298a4',fontSize:12}}>{sub}</div></div>)}
                </div>

                <div style={{padding:"12px 14px",borderRadius:12,background:"#eef8f1",border:"1px solid #d7eadc",color:"#315d3b",fontSize:13,lineHeight:1.5,marginBottom:18}}>
                  <strong>WhatsApp messaging:</strong> choose a student, prepare the message and click <strong>Open WhatsApp &amp; Send</strong>. The chat opens with the message ready; press <strong>Send</strong> in WhatsApp to deliver it.
                </div>

                {showPaymentForm && (
                  <div className="student-form-card" style={{marginBottom:18}}>
                    <div className="form-header">
                      <h2>{editingPayment ? "Edit Payment" : "Add New Payment"}</h2>
                      <button className="close-btn" type="button" onClick={() => {setShowPaymentForm(false);setEditingPayment(null);}}>
                        <IconClose size={15} />
                      </button>
                    </div>
                    <form onSubmit={handleAddPayment}>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Student *</label>
                          <select value={newPayment.studentId} onChange={(e) => setNewPayment({...newPayment,studentId:e.target.value})}>
                            <option value="">Select Student</option>
                            {students.map((student) => (
                              <option key={student.id} value={student.id}>
                                {student.name}
                              </option>
                            ))}
                          </select>
                          {selectedPaymentStudent && (
                            <div className="payment-student-info">
                              <span><strong>Course:</strong> {selectedPaymentStudent.course || "—"}</span>
                              <span><strong>Batch:</strong> {selectedPaymentStudent.batch || "—"}</span>
                              <span><strong>Pending:</strong> {formatMoney(getStudentPending(selectedPaymentStudent))}</span>
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Payment Amount *</label>
                          <input type="number" min="1" placeholder="Enter amount" value={newPayment.amount} onChange={(e) => setNewPayment({...newPayment,amount:e.target.value})} />
                        </div>
                        <div className="form-group">
                          <label>Payment Date *</label>
                          <input type="date" value={newPayment.date} onChange={(e) => setNewPayment({...newPayment,date:e.target.value,nextInstallmentDate:newPayment.nextInstallmentDate||addOneMonth(e.target.value)})} />
                        </div>
                        <div className="form-group">
                          <label>Paid For Month *</label>
                          <input type="month" value={newPayment.paidForMonth} onChange={(e) => setNewPayment({...newPayment,paidForMonth:e.target.value})} />
                        </div>
                        <div className="form-group">
                          <label>Next Installment Date *</label>
                          <input type="date" value={newPayment.nextInstallmentDate} onChange={(e) => setNewPayment({...newPayment,nextInstallmentDate:e.target.value})} />
                        </div>
                        <div className="form-group">
                          <label>Payment Mode *</label>
                          <select value={newPayment.mode} onChange={(e) => setNewPayment({...newPayment,mode:e.target.value})}>
                            <option>UPI</option>
                            <option>Cash</option>
                            <option>Bank Transfer</option>
                            <option>Card</option>
                            <option>Cheque</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Transaction / Reference No.</label>
                          <input type="text" placeholder="Optional" value={newPayment.reference} onChange={(e) => setNewPayment({...newPayment,reference:e.target.value})} />
                        </div>
                      </div>
                      <div className="form-buttons">
                        <button type="button" className="cancel-btn" onClick={() => {setShowPaymentForm(false);setEditingPayment(null);}}>Cancel</button>
                        <button type="submit" className="save-btn">{editingPayment ? "Update Payment" : "Save Payment"}</button>
                      </div>
                    </form>
                  </div>
                )}

                {showWhatsappForm && (
                  <div className="student-form-card" style={{marginBottom:18}}>
                    <div className="form-header">
                      <h2>Send WhatsApp Message</h2>
                      <button className="close-btn" type="button" onClick={() => setShowWhatsappForm(false)}><IconClose size={15} /></button>
                    </div>
                    <form onSubmit={handleQueueWhatsapp}>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Message Template *</label>
                          <select
                            value={newWhatsapp.template}
                            onChange={(e) => {
                              const template = e.target.value;
                              const isHoliday = template === "Holiday Announcement";
                              const nextMode = isHoliday ? "Batch Group" : "Student";
                              const student = students.find((item) => String(item.id) === String(newWhatsapp.studentId));
                              const batch = batches.find((item) => item.name === newWhatsapp.batchName);
                              const nextMessage = isHoliday
                                ? buildWhatsappMessage({ name: "Students", batch: batch?.name || "" }, template)
                                : (student ? buildWhatsappMessage(student, template, { amountDue: newWhatsapp.amountDue }) : "");
                              setNewWhatsapp({ ...newWhatsapp, template, sendMode: nextMode, batchName: isHoliday ? newWhatsapp.batchName : "", message: nextMessage });
                            }}
                          >
                            <option>Fee Reminder</option>
                            <option>Payment Received</option>
                            <option>Holiday Announcement</option>
                            <option>Class Update</option>
                            <option>General Announcement</option>
                          </select>
                        </div>

                        {newWhatsapp.template === "Holiday Announcement" ? (
                          <div className="form-group">
                            <label>Send To *</label>
                            <select
                              value={newWhatsapp.sendMode}
                              onChange={(e) => {
                                const sendMode = e.target.value;
                                const batch = batches.find((item) => item.name === newWhatsapp.batchName);
                                setNewWhatsapp({
                                  ...newWhatsapp,
                                  sendMode,
                                  message: sendMode === "Batch Group"
                                    ? buildWhatsappMessage({ name: "Students", batch: batch?.name || "" }, "Holiday Announcement")
                                    : ""
                                });
                              }}
                            >
                              <option value="Batch Group">Batch WhatsApp Group</option>
                              <option value="Student">Individual Student</option>
                            </select>
                          </div>
                        ) : (
                          <div className="form-group">
                            <label>Student *</label>
                            <select
                              value={newWhatsapp.studentId}
                              onChange={(e) => {
                                const studentId = e.target.value;
                                const student = students.find((item) => String(item.id) === String(studentId));
                                const latestPayment = student ? getLatestStudentPayment(student.id) : null;
                                const amountDue = student ? String(latestPayment?.amount || getStudentPending(student) || "") : "";
                                setNewWhatsapp({
                                  ...newWhatsapp,
                                  studentId,
                                  amountDue,
                                  message: student ? buildWhatsappMessage(student, newWhatsapp.template, { amountDue }) : ""
                                });
                              }}
                            >
                              <option value="">Select Student</option>
                              {students.map((student) => (
                                <option key={student.id} value={student.id}>{student.name} - {student.phone || "No Phone"}</option>
                              ))}
                            </select>
                          </div>
                        )}

                        {newWhatsapp.template === "Holiday Announcement" && newWhatsapp.sendMode === "Batch Group" && (
                          <div className="form-group" style={{gridColumn:"1 / -1"}}>
                            <label>Select Batch *</label>
                            <select
                              value={newWhatsapp.batchName}
                              onChange={(e) => {
                                const batchName = e.target.value;
                                const batch = batches.find((item) => item.name === batchName);
                                setNewWhatsapp({
                                  ...newWhatsapp,
                                  batchName,
                                  message: buildWhatsappMessage({ name: "Students", batch: batchName }, "Holiday Announcement")
                                });
                              }}
                            >
                              <option value="">Select Batch</option>
                              {batches.map((batch) => (
                                <option key={batch.id} value={batch.name}>
                                  {batch.name} - {batch.whatsappGroupLink ? "WhatsApp Group Added" : "Group Link Missing"}
                                </option>
                              ))}
                            </select>
                            {newWhatsapp.batchName && (() => {
                              const batch = batches.find((item) => item.name === newWhatsapp.batchName);
                              return (
                                <div style={{marginTop:8,padding:"10px 12px",borderRadius:10,background:batch?.whatsappGroupLink ? "#edf8f0" : "#fff5f5",border:`1px solid ${batch?.whatsappGroupLink ? "#d4e8d8" : "#efd0d0"}`,color:batch?.whatsappGroupLink ? "#2f6040" : "#a33b3b",fontSize:12}}>
                                  {batch?.whatsappGroupLink ? "✓ WhatsApp Group Link is ready. Click Open WhatsApp & Send to open the batch group and copy the message." : "⚠ Add this batch's WhatsApp Group Link in Batches → Edit first."}
                                </div>
                              );
                            })()}
                          </div>
                        )}

                        {newWhatsapp.template !== "Holiday Announcement" && (() => {
                          const selectedStudent = students.find((item) => String(item.id) === String(newWhatsapp.studentId));
                          const summary = getWhatsappSummary(selectedStudent, newWhatsapp.template, newWhatsapp.amountDue);
                          return selectedStudent ? (
                            <>
                              <div style={{gridColumn:"1 / -1",display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:0,background:"#f4f8f5",border:"1px solid #dfe7e2",borderRadius:18,overflow:"hidden",margin:"2px 0 4px"}}>
                                {[
                                  ["Total Course Fee", formatMoney(summary.totalFee), "#18212f"],
                                  ["Amount Paid", formatMoney(summary.amountPaid), "#18212f"],
                                  ["Total Paid", formatMoney(summary.totalPaid), "#18212f"],
                                  ["Pending", formatMoney(summary.pending), "#b83b32"],
                                ].map(([label,value,valueColor],index)=>(
                                  <div key={label} style={{padding:"16px 12px",textAlign:"center",borderRight:index<3?"1px solid #dfe7e2":"none"}}>
                                    <div style={{color:"#85909d",fontSize:15,fontWeight:600,marginBottom:6}}>{label}</div>
                                    <div style={{color:valueColor,fontSize:25,fontWeight:800,lineHeight:1.15}}>{value}</div>
                                  </div>
                                ))}
                              </div>
                              {newWhatsapp.template === "Fee Reminder" && (
                                <div className="form-group" style={{gridColumn:"1 / -1"}}>
                                  <label>Monthly EMI / This Payment (₹)</label>
                                  <input type="number" min="0" max={summary.pending} placeholder="e.g. 10000" value={newWhatsapp.amountDue} onChange={(e)=>{const amountDue=e.target.value;setNewWhatsapp({...newWhatsapp,amountDue,message:buildWhatsappMessage(selectedStudent,newWhatsapp.template,{amountDue})});}}/>
                                  <div style={{marginTop:9,padding:"10px 12px",borderRadius:10,background:"#f8fbf9",border:"1px solid #e0ebe3",display:"flex",justifyContent:"space-between",gap:10,flexWrap:"wrap",fontSize:13}}>
                                    <span><strong>Balance After Payment:</strong> {formatMoney(summary.balanceAfterPayment || 0)}</span>
                                    <span style={{color:"#71807a"}}>Current Pending: {formatMoney(summary.pending)}</span>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : null;
                        })()}

                        <div className="form-group" style={{gridColumn:"1 / -1"}}>
                          <label>Message *</label>
                          <textarea rows="10" value={newWhatsapp.message} onChange={(e)=>setNewWhatsapp({...newWhatsapp,message:e.target.value})} placeholder="Write WhatsApp message..." />
                        </div>
                      </div>
                      <div className="form-buttons">
                        <button type="button" className="cancel-btn" onClick={()=>setShowWhatsappForm(false)}>Cancel</button>
                        <button type="submit" className="save-btn">
                          {newWhatsapp.template === "Holiday Announcement" && newWhatsapp.sendMode === "Batch Group" ? "Open Batch WhatsApp Group" : "Open WhatsApp & Send"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="students-table-card">
                  <div className="card-header">
                    <div>
                      <h2>WhatsApp Message History</h2>
                      <p>{whatsappLogs.length} message{whatsappLogs.length === 1 ? "" : "s"} prepared in CRM.</p>
                    </div>
                  </div>
                  <div style={{overflowX:"auto"}}>
                    <table style={{width:"100%",tableLayout:"fixed",borderCollapse:"collapse"}}>
                      <colgroup>
                        <col style={{width:"17%"}} />
                        <col style={{width:"15%"}} />
                        <col style={{width:"40%"}} />
                        <col style={{width:"14%"}} />
                        <col style={{width:"14%"}} />
                      </colgroup>
                      <thead><tr><th>Student</th><th>Template</th><th>Message</th><th>Created</th><th>Status</th></tr></thead>
                      <tbody>
                        {whatsappLogs.map((log) => (
                          <tr key={log.id}>
                            <td style={{verticalAlign:"top",padding:"14px",wordBreak:"break-word"}}><strong>{log.student}</strong><div style={{fontSize:12,color:"#9298a4",marginTop:2}}>{log.phone || "-"}</div></td>
                            <td style={{verticalAlign:"top",padding:"14px",wordBreak:"break-word"}}>{log.template}</td>
                            <td style={{verticalAlign:"top",padding:"14px",whiteSpace:"normal",wordBreak:"break-word",overflowWrap:"anywhere",lineHeight:1.5}}>{log.message}</td>
                            <td style={{verticalAlign:"top",padding:"14px",whiteSpace:"normal",color:"#666",lineHeight:1.4}}>{new Date(log.date).toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"})}</td>
                            <td style={{verticalAlign:"top",padding:"14px"}}><span style={{display:"inline-block",fontSize:12,fontWeight:700,color:"#315d3b",background:"#eef8f1",padding:"6px 9px",borderRadius:999,whiteSpace:"nowrap"}}>{log.status}</span></td>
                          </tr>
                        ))}
                        {!whatsappLogs.length && <tr><td colSpan="5" style={{textAlign:"center",padding:42,color:"#777"}}>No WhatsApp messages prepared yet.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ================= OTHER MODULES ================= */}
        {/* ================================================= */}

        {activeMenu !== "Dashboard" &&
          activeMenu !== "Students" &&
          activeMenu !== "Admissions" && activeMenu !== "Courses" && activeMenu !== "Batches" &&
          activeMenu !== "Fees" &&
          activeMenu !== "Payments" && activeMenu !== "Staff" && activeMenu !== "Attendance" && activeMenu !== "Announcements" && (

            <div className="coming-soon">


              <div className="coming-icon">

                <IconSparkle size={24} />

              </div>


              <h2>
                {activeMenu} Module
              </h2>


              <p>
                This module will be connected with your Supabase database.
              </p>


              <button

                onClick={() =>
                  setActiveMenu("Dashboard")
                }

              >

                Back to Dashboard

              </button>


            </div>

          )}


      </main>


    </div>

  );
}

export default App;