"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {api} from "@/services/api";

export function useProtectedPage(allowedRoles = []) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await api.get("/auth/me");
        const role = res?.user?.role;
        setUserRole(role);

        // Start Debug
        console.log(`[RBAC] User Role: ${role}, Allowed: ${allowedRoles}`);

        if (!role) {
          console.warn("[RBAC] No role found, redirecting.");
          router.replace("/login");
          return;
        }

        const normalizedRole = role.toLowerCase();
        const normalizedAllowed = allowedRoles.map((r) => r.toLowerCase());

        if (allowedRoles.length > 0 && !normalizedAllowed.includes(normalizedRole)) {
          // Redirect unauthorized users
          if (normalizedRole === "avaliador") router.replace("/visualizar");
          else if (normalizedRole === "stakeholder" || normalizedRole === "cliente") router.replace("/cliente");
          else router.replace("/inicio");
        } else {
          setAuthorized(true);
        }
      } catch (err) {
        console.error("Auth check failed", err);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, [allowedRoles, router]);

  return {authorized, userRole, loading};
}
