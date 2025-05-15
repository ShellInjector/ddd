import { quoteRequests, type QuoteRequest, type InsertQuoteRequest, type User, type InsertUser, type ContactForm } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quote request methods
  createQuoteRequest(quoteRequest: InsertQuoteRequest): Promise<QuoteRequest>;
  getAllQuoteRequests(): Promise<QuoteRequest[]>;
  getQuoteRequestById(id: number): Promise<QuoteRequest | undefined>;
  updateQuoteRequestStatus(id: number, status: string): Promise<QuoteRequest | undefined>;
  
  // Contact form
  saveContactForm(contactForm: ContactForm): Promise<boolean>;
  
  // Session store
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quoteRequests: Map<number, QuoteRequest>;
  private contactForms: ContactForm[];
  currentUserId: number;
  currentQuoteRequestId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.quoteRequests = new Map();
    this.contactForms = [];
    this.currentUserId = 1;
    this.currentQuoteRequestId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24 hours
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Quote request methods
  async createQuoteRequest(insertQuoteRequest: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = this.currentQuoteRequestId++;
    const now = new Date();
    const quoteRequest: QuoteRequest = {
      ...insertQuoteRequest,
      id,
      status: 'pending',
      createdAt: now
    };
    this.quoteRequests.set(id, quoteRequest);
    return quoteRequest;
  }
  
  async getAllQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.quoteRequests.values()).sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
  
  async getQuoteRequestById(id: number): Promise<QuoteRequest | undefined> {
    return this.quoteRequests.get(id);
  }
  
  async updateQuoteRequestStatus(id: number, status: string): Promise<QuoteRequest | undefined> {
    const quoteRequest = this.quoteRequests.get(id);
    if (quoteRequest) {
      const updatedQuoteRequest = { ...quoteRequest, status };
      this.quoteRequests.set(id, updatedQuoteRequest);
      return updatedQuoteRequest;
    }
    return undefined;
  }
  
  // Contact form
  async saveContactForm(contactForm: ContactForm): Promise<boolean> {
    this.contactForms.push(contactForm);
    return true;
  }
}

export const storage = new MemStorage();
